import { Card } from "@/components/ui/card";
import CompLayout from "./CompLayout";
import Image from "next/image";

// Define feature data with images
const features = [
  {
    title: "Personalized Experience",
    image: "/images/personalized.svg", // Add your image path here
    items: [
      "AI-powered Personalization",
      "Adaptive content evolution",
      "Choose Your Genre and Mood",
      "Goal-Aligned Meditation",
      "Create Mood-Boosting Melodies",
    ],
  },
  {
    title: "Motivation on Demand",
    image: "/images/motivation.svg", // Add your image path here
    items: [
      "Instant mood-boosting audio",
      "Quick-start inspiration",
      "Customizable affirmations",
      "Goal-specific tracks",
    ],
  },
  {
    title: "Science-Based Calmness",
    image: "/images/science.svg", // Add your image path here
    items: [
      "Pro-trained AI",
      "Neuroscience-based sounds",
      "Expert-updated content",
      "Evidence-based mood lifting",
      "Psychologist-refined algorithms",
    ],
  },
];

// Updated FeatureCard component with dynamic image
const FeatureCard = ({ title, items, image }) => (
  <Card className="max-w-md p-6 bg-white border rounded-3xl border-black shadow-[0_5px_0px_0px_rgba(1,1,1,1)] transition-all duration-300 hover:shadow-[0_8px_0px_0px_rgba(1,1,1,1)] hover:-translate-y-1">
    <div className="flex items-end gap-4 mb-6">
      <div className="relative w-16 h-16 overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={64}
          height={64}
          className="absolute inset-0 w-full h-full object-contain  mix-blend-multiply"
        />
      </div>
      <h2 className="text:md md:text-xl text-left font-semibold pt-2">{title}</h2>
    </div>
    <div className="h-px bg-black mb-6" />
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-center group">
          <span className="w-1.5 h-1.5 bg-colorTheme-secondary rounded-full mr-2 group-hover:bg-lime-500 transition-colors"></span>
          <span className="text-xs md:text-base text-left group-hover:text-lime-500 transition-colors">{item}</span>
        </li>
      ))}
    </ul>
  </Card>
);

export default function FeaturesGrid() {
  return (
    <div id="benefits"  className=" mt-12">
      <CompLayout
        title="Your Personal AI Zen Guide"
        description="We craft AI-generated music that instantly elevates your mood, backed by neuroscience and expert techniques. Experience personalized melodies that adapt to your needs, bringing harmony with just a tap. Our psychologist-refined algorithms ensure evidence-based mood enhancement, blending technology and expertise in every track."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              items={feature.items}
              image={feature.image}
            />
          ))}
        </div>
      </CompLayout>
    </div>
  );
}