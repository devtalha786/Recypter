import Image from "next/image";
import React from "react";
import applle from "../../public/images/apple-logo-svgrepo-com.svg";
import nike from "../../public/images/icons8-nike-100.svg";
import amazon from "../../public/images/amazon-svgrepo-com.svg";
import prada from "../../public/images/prada-seeklogo-4.svg";
import dior from "../../public/images/dior-svgrepo-com.svg";
import ebay from "../../public/images/icons8-ebay-100.svg";
import dyson from "../../public/images/dyson-seeklogo.png";
import Link from "next/link";
const SupportedBrand = () => {
  return (
    <div>
      <section class=" py-16 mt-10 px-6">
        <div class="max-w-7xl mx-auto text-center ">
          <h2 className="font-bold text-[30px]  md:text-[48px] leading-[100%] tracking-[-0.4%]  mb-5 text-[#373072]">
            We Support All Major Brands
          </h2>
          <p class="text-gray-600 text-lg max-w-xl mx-auto mb-12">
            Our generator supports 15+ top-tier brands — from tech giants to
            streetwear legends.
          </p>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6  ">
            <div class="flex items-center justify-center shadow-[0px_12px_56px_0px_rgba(6,28,61,0.08),0px_-20px_220px_0px_rgba(73,53,255,0.35)]  rounded-xl h-24   hover:shadow-md transition">
              <Image src={applle} alt="Apple" class="h-16" />
            </div>
            <div class="flex items-center justify-center shadow-[0px_12px_56px_0px_rgba(6,28,61,0.08),0px_-20px_220px_0px_rgba(73,53,255,0.35)]  rounded-xl h-24   hover:shadow-md transition">
              <Image src={nike} alt="Apple" class="h-16" />
            </div>
            <div class="flex items-center justify-center shadow-[0px_12px_56px_0px_rgba(6,28,61,0.08),0px_-20px_220px_0px_rgba(73,53,255,0.35)]  rounded-xl h-24   hover:shadow-md transition">
              {/* <img src="/logos/amazon.svg" alt="Amazon" class="h-6" /> */}
              <Image src={amazon} alt="Apple" class="h-16" />
            </div>
            <div class="flex items-center justify-center shadow-[0px_12px_56px_0px_rgba(6,28,61,0.08),0px_-20px_220px_0px_rgba(73,53,255,0.35)]  rounded-xl h-24   hover:shadow-md transition">
              <Image src={dior} alt="Apple" class="h-16" />
            </div>
            <div class="flex items-center justify-center shadow-[0px_12px_56px_0px_rgba(6,28,61,0.08),0px_-20px_220px_0px_rgba(73,53,255,0.35)]  rounded-xl h-24   hover:shadow-md transition">
              <Image src={ebay} alt="Apple" class="h-16" />
            </div>

            <div class="flex items-center justify-center shadow-[0px_12px_56px_0px_rgba(6,28,61,0.08),0px_-20px_220px_0px_rgba(73,53,255,0.35)]  rounded-xl h-24   hover:shadow-md transition">
              <Image src={prada} alt="prada" class="h-12" />
            </div>
            <div class="flex items-center justify-center shadow-[0px_12px_56px_0px_rgba(6,28,61,0.08),0px_-20px_220px_0px_rgba(73,53,255,0.35)]  rounded-xl h-24   hover:shadow-md transition">
              <Image src={dyson} alt="prada" class="h-12" />
            </div>

            <div class="flex items-center justify-center shadow-[0px_12px_56px_0px_rgba(6,28,61,0.08),0px_-20px_220px_0px_rgba(73,53,255,0.35)]  rounded-xl h-24   hover:shadow-md transition">
              <span class="text-gray-500 font-medium">+ More</span>
            </div>
          </div>

          <div class="mt-10">
            <Link href="/receipts">
              <button className="bg-[#6259b5] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#6259b5] transition-all duration-300 transform hover:scale-105 shadow-lg">
                Request a Brand
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportedBrand;
