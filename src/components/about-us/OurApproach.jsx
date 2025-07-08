import React from 'react'
import CompLayout from '../CompLayout'
import { FeatureCard } from '@/utils/HelperFunctions'
const FEATURES = [
    {
      title: "Innovation",
      description:
        "We're constantly pushing the boundaries of what's possible in AI-generated music.",
    },
    {
      title: "Personalization",
      description:
        "Every track is as unique as you are, adapting to your evolving needs and goals.",
    },
    {
      title: "Continuous Improvement",
      description:
        "We learn from user feedback to enhance our AI and expand our musical offerings.",
    },
  ];
  
  
const OurApproach = () => {
  return (
    <div  >
    <CompLayout
      
      title="Our Approach"
      description="Our innovative approach combines cutting-edge AI with deep understanding of human motivation, delivering perfectly timed tracks that elevate your mood and empower your journey to success."
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
  )
}

export default OurApproach
