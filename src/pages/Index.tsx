import FloatingHearts from "@/components/FloatingHearts";
import SparkleTrail from "@/components/SparkleTrail";
import HeroSection from "@/components/HeroSection";
import LoveCounter from "@/components/LoveCounter";
import ParallaxDivider from "@/components/ParallaxDivider";
import ReasonsSection from "@/components/ReasonsSection";
import LoveNotesWall from "@/components/LoveNotesWall";
import InteractivePoem from "@/components/InteractivePoem";
import MemoryGallery from "@/components/MemoryGallery";
import ScratchOff from "@/components/ScratchOff";
import PromisesSection from "@/components/PromisesSection";
import ValentineQuestion from "@/components/ValentineQuestion";

const Index = () => {
  return (
    <div className="relative">
      <FloatingHearts />
      <SparkleTrail />
      <HeroSection />
      <ParallaxDivider variant="hearts" />
      <LoveCounter />
      <ParallaxDivider variant="stars" />
      <ReasonsSection />
      <ParallaxDivider variant="petals" />
      <LoveNotesWall />
      <ParallaxDivider variant="bubbles" />
      <InteractivePoem />
      <ParallaxDivider variant="hearts" />
      <MemoryGallery />
      <ParallaxDivider variant="stars" />
      <ScratchOff />
      <ParallaxDivider variant="petals" />
      <PromisesSection />
      <ParallaxDivider variant="hearts" />
      <ValentineQuestion />
    </div>
  );
};

export default Index;
