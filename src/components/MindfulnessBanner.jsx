"use client"
import Image from "next/image";
import CustomButton from "./common/CustomButton";
import { useRouter } from "next/navigation";
import { ScrollToSection } from "@/utils/HelperFunctions";

export default function MindfulnessBanner({onClick}) {
  const router = useRouter()
  return (
    <div className="relative bg-zinc-100 mx-5 md:mx-0 my-16 rounded-3xl p-8 md:p-12">
      <div className=" w-full md:max-w-3xl lg:max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 relative">
        {/* Text Content */}
        <div className="max-w-lg text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Start Your Mindfulness Journey
          </h2>
          <p className="text-colorTheme-secondary mb-6 font-semibold">
            Unlock AI-powered meditations that grow with you. Tailored
            soundscapes meet your changing needs, ensuring a fresh, effective
            practice every time. Start evolving now.
          </p>

          <CustomButton onClick={onClick} text="Create Your Sound" />
            
        </div>

        {/* Illustration */}
        <div className="absolute right-0 w-full md:w-auto hidden md:block"> {/* Hidden on mobile and shown on larger screens */}
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/mizanme-42dca.firebasestorage.app/o/images%2FIllustration.png?alt=media&token=4e8bda8d-b28d-4ddb-bc40-98d8a2861385"
            alt="Meditation Illustration"
            width={450}
            height={450}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
