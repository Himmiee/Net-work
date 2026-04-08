import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import StatsTicker from "./components/StatsTicker";
import FeaturesSection from "./components/FeaturesSection";
import BottomCTA from "./components/BottomCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="relative bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <StatsTicker />
      <FeaturesSection />
      <BottomCTA />
      <Footer />
    </div>
  );
}
