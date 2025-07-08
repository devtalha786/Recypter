"use client";
import MeettheTeam from "@/components/about-us/MeettheTeam";
import MindFulnessBannerAboutUs from "@/components/about-us/MindFulnessBannerAboutUs";
import OurApproach from "@/components/about-us/OurApproach";
import OurMission from "@/components/about-us/OurMission";
import TheScience from "@/components/about-us/TheScience";
import YourPath from "@/components/about-us/YourPath";
import MindfulnessBanner from "@/components/MindfulnessBanner";
import { useRouter } from "next/navigation";

const page = () => {
  return (
    <div className="mt-44">
      <OurMission />
      <MeettheTeam />
      <MindFulnessBannerAboutUs />

      <TheScience />
      <YourPath />
      <div className="-mt-20">
        <OurApproach />
        
      </div>
      <MindFulnessBannerAboutUs />
    </div>
  );
};

export default page;
