import { FeatureCard } from "@/utils/HelperFunctions";
import CompLayout from "./CompLayout";

// Define features as a constant array
const FEATURES = [
  {
    title: "Tell Us What You Need",
    description:
      "Select your current mood or goal—whether you want to focus, relax, or manifest success.",
  },
  {
    title: "Get a Personalized Track",
    description:
      "Our AI crafts personalized tracks in seconds, aligning with your energy and goals to elevate your mood.",
  },
  {
    title: "Enjoy and Stay Inspired",
    description:
      "Listen to music that empowers you, with optional affirmations and motivational messages embedded in the songs.",
  },
];



export default function FeaturesSection() {
  return (
    <div id="how-it-works" >
    <CompLayout
      
      title="How it Works"
      description="Music has the power to transform your mindset, boost your productivity, and bring calm to your day. But finding the right song at the right moment can be overwhelming. That's where we come in. With MizanMe, you get personalized music that adapts to your mood and goals—whether you're looking to focus, unwind, or manifest your dreams."
      content="No more endless scrolling through playlists or generic recommendations. With MizanMe, every song is chosen just for you, helping you stay motivated, relaxed, and inspired throughout your day. Ready to experience music that truly resonates with you? Let our AI do the work while you enjoy the perfect soundtrack for any moment."
    >
      <section className="bg-colorTheme-secondary px-6 py-12 md:py-16 rounded-3xl">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x-2  md:divide-white-200 md:h-44">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>
    </CompLayout>
    </div>
  );
}
