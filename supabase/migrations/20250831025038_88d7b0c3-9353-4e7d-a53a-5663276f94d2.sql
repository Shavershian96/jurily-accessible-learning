-- Fix infinite recursion in RLS policies by creating security definer functions

-- Create security definer function to get current user role safely
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT 
LANGUAGE SQL 
SECURITY DEFINER 
STABLE
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- Create security definer function to check if user has specific role
CREATE OR REPLACE FUNCTION public.has_role(user_id uuid, required_role text)
RETURNS boolean
LANGUAGE SQL
SECURITY DEFINER
STABLE 
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = required_role
  );
$$;

-- Create security definer function to check if user has admin privileges
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = ANY(ARRAY['ADMIN', 'SUPERADMIN'])
  );
$$;

-- Create security definer function to check if user is teacher or admin
CREATE OR REPLACE FUNCTION public.is_teacher_or_admin(user_id uuid)
RETURNS boolean
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = ANY(ARRAY['TEACHER', 'ADMIN', 'SUPERADMIN'])
  );
$$;

-- Update the existing isPremiumUser function to use proper search path
DROP FUNCTION IF EXISTS public."isPremiumUser"(uuid);
CREATE OR REPLACE FUNCTION public.is_premium_user(user_id uuid)
RETURNS boolean
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS(
    SELECT 1
    FROM public.subscriptions s
    WHERE s."userId" = user_id
      AND s.status = 'ACTIVE'
      AND (s."currentPeriodEnd" IS NULL OR s."currentPeriodEnd" > now())
  );
$$;

-- Update the createProfileForNewUser trigger function to use proper search path
DROP FUNCTION IF EXISTS public."createProfileForNewUser"();
CREATE OR REPLACE FUNCTION public.create_profile_for_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, "avatarUrl")
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'name', 
    new.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

-- Recreate the trigger with the new function name
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_profile_for_new_user();

-- Update materials policies to use security definer functions
DROP POLICY IF EXISTS "materials_select_public_author_or_premium" ON public.materials;
CREATE POLICY "materials_select_public_author_or_premium" 
ON public.materials 
FOR SELECT 
USING (
  "isPremium" = false 
  OR "authorId" = auth.uid() 
  OR public.is_premium_user(auth.uid())
);

DROP POLICY IF EXISTS "materials_insert_only_teacher_or_admin" ON public.materials;
CREATE POLICY "materials_insert_only_teacher_or_admin" 
ON public.materials 
FOR INSERT 
WITH CHECK (public.is_teacher_or_admin(auth.uid()));

DROP POLICY IF EXISTS "materials_update_owner_or_admin" ON public.materials;
CREATE POLICY "materials_update_owner_or_admin" 
ON public.materials 
FOR UPDATE 
USING (
  "authorId" = auth.uid() 
  OR public.is_admin(auth.uid())
);

DROP POLICY IF EXISTS "materials_delete_owner_or_admin" ON public.materials;
CREATE POLICY "materials_delete_owner_or_admin" 
ON public.materials 
FOR DELETE 
USING (
  "authorId" = auth.uid() 
  OR public.is_admin(auth.uid())
);

-- Update profiles policies to use security definer functions
DROP POLICY IF EXISTS "profiles_select_self_or_admin" ON public.profiles;
CREATE POLICY "profiles_select_self_or_admin" 
ON public.profiles 
FOR SELECT 
USING (
  id = auth.uid() 
  OR public.is_admin(auth.uid())
);

DROP POLICY IF EXISTS "profiles_update_self_or_admin" ON public.profiles;
CREATE POLICY "profiles_update_self_or_admin" 
ON public.profiles 
FOR UPDATE 
USING (
  id = auth.uid() 
  OR public.is_admin(auth.uid())
);

-- Update menus policies
DROP POLICY IF EXISTS "menus_select_public_or_admin" ON public.menus;
CREATE POLICY "menus_select_public_or_admin" 
ON public.menus 
FOR SELECT 
USING (
  visible = true 
  OR public.is_admin(auth.uid())
);

DROP POLICY IF EXISTS "menus_write_admin_only" ON public.menus;
CREATE POLICY "menus_write_admin_only" 
ON public.menus 
FOR ALL 
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Update subscriptions policies
DROP POLICY IF EXISTS "subscriptions_select_owner_or_admin" ON public.subscriptions;
CREATE POLICY "subscriptions_select_owner_or_admin" 
ON public.subscriptions 
FOR SELECT 
USING (
  "userId" = auth.uid() 
  OR public.is_admin(auth.uid())
);

-- Update audioJobs policies
DROP POLICY IF EXISTS "audioJobs_insert_teacher_or_admin" ON public."audioJobs";
CREATE POLICY "audioJobs_insert_teacher_or_admin" 
ON public."audioJobs" 
FOR INSERT 
WITH CHECK (public.is_teacher_or_admin(auth.uid()));

DROP POLICY IF EXISTS "audioJobs_select_owner_author_or_admin" ON public."audioJobs";
CREATE POLICY "audioJobs_select_owner_author_or_admin" 
ON public."audioJobs" 
FOR SELECT 
USING (
  "requestedBy" = auth.uid() 
  OR EXISTS (
    SELECT 1 FROM public.materials m 
    WHERE m.id = "audioJobs"."materialId" AND m."authorId" = auth.uid()
  )
  OR public.is_admin(auth.uid())
);