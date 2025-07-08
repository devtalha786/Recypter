"use client"
import FAQSection from "@/components/FAQSection";
import FeaturedMeditation from "@/components/FeaturedMeditation";
import FeaturesGrid from "@/components/FeaturesGrid";
import FeaturesSection from "@/components/FeaturesSection";
import { FormComponent } from "@/components/Form";
import HeroSection from "@/components/HeroSection";
import MindfulnessBanner from "@/components/MindfulnessBanner";
import TestimonialSection from "@/components/TestimonialSection";
import VideoSection from "@/components/VideoSection";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const {id} = useParams()
  

  useEffect(() => {
    if (id) {
      const element = document.getElementById(id);
      if (element) {
     

        // Option 2: Alternative method using smooth scroll polyfill
        window.scroll({
          top: element.offsetTop - 100, // Subtract header height or desired offset
          behavior: 'smooth'
        });
      }
    }
  }, [id]);

  return (
    <>
      <HeroSection />
      <FeaturedMeditation />
      <MindfulnessBanner />
      <FeaturesSection />
      <VideoSection />
      <FeaturesGrid />
      <MindfulnessBanner />
      <TestimonialSection />
      <FormComponent />
      <FAQSection />
    </>
  );
};

export default HomePage;
