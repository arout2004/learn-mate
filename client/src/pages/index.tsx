import { Allcourses, HeroSection } from "@/components/home";
import Feedback from "@/components/home/Feedback";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import { PublicLayout } from "@/layouts";

export default function Home() {
  return (
    <PublicLayout title="Home | Learn-Mate">
      <HeroSection />
      <Allcourses />
      {/* <InstructorSections /> */}
      <HowItWorksSection />
      <Feedback />
    </PublicLayout>
  );
}
