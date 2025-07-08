"use client";
import { Button } from "@/components/ui/button";
import { ScrollToSection } from "@/utils/HelperFunctions";
import Image from "next/image";
import hero from "../../public/images/heroSection.png";
export default function HeroSection() {
  return (
    <section className=" px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-5xl lg:text-6xl font-bold text-[#6458c1]  mb-6 leading-tight">
              Generate Any Brand Receipt in Seconds
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Create professional, customizable receipts for personal, business,
              or educational use.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-[#6259b5] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#6259b5] transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get Started Free
              </button>
              <button className="bg-transparent text-[#6259b5] px-8 py-4 rounded-lg text-lg font-semibold border-2 border-[#6259b5] transition-all duration-300">
                See Templates
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="  rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <Image
                  src={hero}
                  alt="Professional Receipt Document"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              {/* <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#6259b5] rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
