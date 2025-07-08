import React from "react";
import CompLayout from "../CompLayout";
import { Card } from "../ui/card";
import CustomLabel from "../common/CustomLabel";

const PathCard = ({ title, description, isPrimary }) => (
  <Card 
    className={`h-72 flex flex-col justify-center items-center rounded-3xl p-6 border border-black shadow-[0_5px_0px_0px_rgba(1,1,1,1)] transition-all duration-300 ${
      isPrimary ? "bg-colorTheme-primary" : "bg-gray-100"
    }`}
  >
    <div className="w-full md:max-w-md">
      <CustomLabel
        text={title}
        className={`inline-block mb-12 ${
          isPrimary ? "bg-colorTheme-gray" : "bg-colorTheme-primary"
        }`}
      />
      <p>{description}</p>
    </div>
  </Card>
);

const YourPath = () => {
  const pathCards = [
    {
      title: "Meditation & Mindfulness",
      description: "Select your emotional state and goals—whether you want to enhance self-awareness, develop intuition, or strengthen emotional regulation. Our specialists guide your journey through mindful development.",
      isPrimary: true
    },
    {
      title: "Intuition & Emotional Intelligence",
      description: "Experience transformative personal development with expert guidance, featuring customized growth strategies and stress management techniques embedded in your daily practice.",
      isPrimary: false
    },
    {
      title: "Creative Expression & Flow",
      description: "Unlock your creative potential and achieve flow states with specialized tracks designed to enhance artistic expression, problem-solving, and innovative thinking in your daily practice.",
      isPrimary: false
    },
    {
      title: "Sleep & Relaxation",
      description: "Choose your preferred wind-down experience—from gentle meditation to deep sleep preparation. Let our specialized tracks guide you to restorative rest and peaceful mindfulness.",
      isPrimary: true
    }
  ];

  return (
    <div className="h-auto -mt-28">
      <CompLayout
        title="Your Path to Transformation"
        description="Discover personalized musical experiences that adapt to every moment of your journey, empowering you to reach your highest potential through AI-crafted soundtracks."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pathCards.map((card, index) => (
            <PathCard key={index} {...card} />
          ))}
        </div>
      </CompLayout>
    </div>
  );
};

export default YourPath;