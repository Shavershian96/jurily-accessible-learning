import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedMaterials from "@/components/FeaturedMaterials";
import SpotifyIntegration from "@/components/SpotifyIntegration";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Navbar />
      <main>
        <Hero />
        <CategoriesSection />
        <FeaturedMaterials />
        <SpotifyIntegration />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
