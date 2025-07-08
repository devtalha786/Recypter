"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WhatWeOffer from "../WhatWeOffer";
import OfferSubscription from "../OfferSubscription";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getReceipts } from "@/store/subscription/subscriptionThunk";

export default function Receipts() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { receipts } = useSelector((state) => state.subscription);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.uid) {
      dispatch(getReceipts(user?.uid));
    }
  }, [user]);

  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (
      (receipts?.validUntil &&
        receipts != null &&
        receipts?.productName == "Per Week") ||
      receipts?.productName == "Per Day"
    ) {
      const interval = setInterval(() => {
        const now = new Date();
        const validUntilDate = receipts.validUntil.toDate();
        const diff = validUntilDate - now;
        const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(
          `${daysLeft} days, ${hoursLeft} hours, ${minutesLeft} minutes, ${secondsLeft} seconds left`
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [receipts]);
  console.log("receipts", receipts?.subscriptionStatus);

  // if (user?.status == "Open" && !user?.uid && receipts?.subscriptionStatus != "completed" || receipts == null || !user?.uid) {
  //     return <OfferSubscription />;
  // }
  if (
    (receipts?.subscriptionStatus != "completed" ||
      receipts == null ||
      !user?.uid) &&
    user?.status !== "Free"
  ) {
    return <OfferSubscription />;
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        Receipts
      </h1>
      {receipts?.productName === "Per Week" ||
      (receipts?.productName === "Per Day" &&
        receipts != null &&
        user?.uid &&
        user?.status !== "Free") ? (
        <>
          <div className="mx-auto my-4 py-4">
            <div className="gap-4 mx-auto grid grid-cols-9">
              <span className="font-bold text-lg col-span-3 text-[#3288dd]">
                Receipts subscription:
              </span>
              <span className="text-lg text-white col-span-4">
                {receipts?.productName}
              </span>
            </div>
            <div className="gap-4 grid grid-cols-9 place-content-end">
              <span className="font-bold text-lg col-span-3 text-[#3288dd]">
                Valid Until:
              </span>
              <span className="text-lg text-white col-span-4">
                {receipts?.validUntil?.toDate().toLocaleString()}
              </span>
            </div>
            <div className="gap-4 grid grid-cols-9 place-content-end">
              <span className="font-bold text-lg col-span-3 text-[#3288dd]">
                Days and Time Left:
              </span>
              <span className="text-lg text-white col-span-6">{timeLeft}</span>
            </div>
          </div>
        </>
      ) : receipts != null && user?.uid && user?.status !== "Free" ? (
        <>
          <div className="gap-4 mx-auto grid grid-cols-9">
            <span className="font-bold text-lg col-span-3 text-[#3288dd]">
              Receipts subscription:
            </span>
            <span className="text-lg text-white col-span-4">
              {receipts?.productName}
            </span>
          </div>
        </>
      ) : null}

      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left side - Description */}
        <div className="lg:w-1/2">
          <p className="text-white text-lg mb-6">
            To find out what brands we offer click the button below that will
            take you to our discord. You can use our discord bot to make these
            receipts, everything you need is customizable with a spoofing option
            to make these emails look as legit as possible
          </p>
          <div className="flex flex-col gap-4">
            {/* <Link href="https://discord.gg/receiptgen">
                            <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition">
                                More Examples!
                            </button></Link> */}

            <button
              onClick={() => {
                router.push("/create-receipt");
              }}
              className="bg-blue-500 my-4 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition font-semibold"
            >
              Create Receipt
            </button>
          </div>
        </div>

        {/* Right side - Receipt Card */}
        <div className="lg:w-1/2">
          <img
            src="/images/stockx_preview.png"
            alt="Receipt"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Create Receipt Button */}
    </div>
  );
}
