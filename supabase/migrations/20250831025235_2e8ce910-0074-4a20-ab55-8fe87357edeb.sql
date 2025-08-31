-- First drop all policies that depend on the old function
DROP POLICY IF EXISTS "materials_select_public_author_or_premium" ON public.materials;

-- Drop the old function
DROP FUNCTION IF EXISTS public."isPremiumUser"(uuid);

-- Create the new function with proper naming and search path
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

-- Recreate the policy with the new function
CREATE POLICY "materials_select_public_author_or_premium" 
ON public.materials 
FOR SELECT 
USING (
  "isPremium" = false 
  OR "authorId" = auth.uid() 
  OR public.is_premium_user(auth.uid())
);