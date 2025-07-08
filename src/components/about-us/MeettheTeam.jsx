import React from "react";
import CompLayout from "../CompLayout";
import { Card } from "../ui/card";
const StoryCard = ({ title, description, isGreen = false }) => (
  <Card
    className={`w-full rounded-3xl min-h-56 p-8 mb-8 border border-black shadow-[0_5px_0px_0px_rgba(1,1,1,1)] transition-all duration-300  ${
      isGreen ? "bg-colorTheme-primary" : "bg-colorTheme-gray"
    }`}
  >
    <h2 className="text-2xl font-semibold text-center mb-4">{title}</h2>
    <div className="w-full border-t border-black mb-4" />
    <p className="text-center text-gray-800 leading-relaxed">{description}</p>
  </Card>
);
const MeettheTeam = () => {
  const stories = [
    {
      title: "Fueled by Music, Inspired by Limits",
      description:
        "The rhythm of development is set to an energetic playlist. The driving force? A deep connection to uplifting music that not only motivates but pushes boundaries. It's this very feeling—of being positively affected and energized by music—that defines the app's soul.",
      isGreen: true,
    },
    {
      title: "Passion in Every Note",
      description:
        "The app's development process is anything but ordinary. Each feature is born in a vibrant atmosphere where positivity and uplifting energy from music create the perfect backdrop for creativity. It's this unique blend of passion and melody that ensures the app will inspire its users as much as it inspires its creator.",
      isGreen: false,
    },
    {
      title: "Driven by Personal Experience",
      description:
        "The idea for this app wasn't born in a boardroom or during a brainstorming session—it came from a deeply personal experience. The creator's connection to music is not just about listening; it's about feeling. Each beat, melody, and lyric sparks something powerful: motivation, determination, and the courage to push limits.",
      isGreen: true,
    },
  ];
  return (
    <div className="-mt-28">

    <CompLayout
      title="Meet the Team"
      description="Behind every masterpiece lies a story of dedication and heart. At the core of this app's creation is not a sprawling team, but one passionate individual driven by an unwavering commitment to deliver something extraordinary. While most teams rely on a symphony of collaborators, this app is powered by the singular vision and effort of one person. Every line of code, every feature design, and every idea has been carefully crafted with care and intention, ensuring every detail resonates with purpose."
    >
      <div className=" p-6">
        {stories.map((story, index) => (
          <StoryCard
            key={index}
            title={story.title}
            description={story.description}
            isGreen={story.isGreen}
          />
        ))}
      </div>
    </CompLayout>
    </div>
  );
};

export default MeettheTeam;
