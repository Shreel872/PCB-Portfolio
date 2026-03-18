import HeroSection from "../components/landing/HeroSection";
import FeaturedProject from "../components/landing/FeaturedProject";
import ACUProjectCard from "../components/landing/ACUProjectCard";
import EngineeringApproach from "../components/landing/EngineeringApproach";

export default function ProjectsPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <HeroSection />
      <div className="border-t border-gray-800/60" />
      <FeaturedProject />
      <div className="border-t border-gray-800/60" />
      <ACUProjectCard />
      <div className="border-t border-gray-800/60" />
      <EngineeringApproach />
    </div>
  );
}
