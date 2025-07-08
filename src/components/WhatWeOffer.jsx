"use client";
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { useEffect, Suspense } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginWithDiscord } from "@/store/auth/authThunk";
import { useRouter } from "next/navigation";
import FAQSection from "./FAQSection";

// Create a separate component for the part that uses useSearchParams
const WhatWeOfferContent = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const toastMessage = searchParams.get("toast");
    const toastType = searchParams.get("type");
    const userId = searchParams.get("userId");
    if (userId) {
      dispatch(
        loginWithDiscord({
          userId,
          onSuccess: () => {
            if (toastMessage) {
              if (toastType === "success") {
                router.push(`/home`);
                toast.success(toastMessage);
              } else if (toastType === "error") {
                router.push(`/home`);
                toast.error(toastMessage);
              }
            }
          },
          onError: (error) => {
            console.log(error);
          },
        })
      );
    }
  }, [searchParams]);

  const offerings = [
    {
      title: "Email Receipt Generator",
      description:
        "With this service you'll be able to make receipts from many well known brands.",
      features: ["Easy to use", "Spoofing", "Customizable"],
      link: "/receipts",
    },
    {
      title: "StockX Emulators",
      description:
        "StockX that look just like the real ones. No downloads needed since it's a web app.",
      features: ["No Downloading", "Best Value", "Customizable"],
      link: "/emulators",
    },
    {
      title: "Paper Receipt Maker",
      description:
        "Editable paper receipts useful for printing your own. Just hit print or save image.",
      features: ["Just hit print", "Best proof", "Fully Customizable"],
      link: "/papers",
    },
  ];

  const handleViewClick = (link) => {
    router.push(link);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {offerings.map((offering, index) => (
        <div
          key={index}
          className="bg-[#eef2ff] rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-[28px] font-bold text-[#6259b5] mb-4">
            {offering.title}
          </h3>
          <p className="text-gray-600 font-bold mb-4">{offering.description}</p>
          <ul className="text-gray-600 font-bold mb-6">
            {offering.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
          <Button
            className="w-full bg-[#6259b5] hover:bg-[#6259b5] text-white"
            onClick={() => handleViewClick(offering.link)}
          >
            View
          </Button>
        </div>
      ))}
    </div>
  );
};

// Main component wrapped with Suspense
const WhatWeOffer = () => {
  return (
    <div className="pt-24">
      <h2 className="text-5xl font-bold text-[#393274] text-center mb-12">
        What We Offer
      </h2>
      <Suspense fallback={<div>Loading...</div>}>
        <WhatWeOfferContent />
      </Suspense>

      {/* <FAQSection /> */}
    </div>
  );
};

export default WhatWeOffer;
