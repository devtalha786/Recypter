"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WhatWeOffer from "../WhatWeOffer";
import OfferSubscription from "../OfferSubscription";
import { getReceipts } from "@/store/subscription/subscriptionThunk";
import HeroSection from "../HeroSection";
import FAQSection from "../FAQSection";
import SupportedBrand from "../SupportedBrand";

export default function MainHome() {
  const { user } = useSelector((state) => state.auth);

  const { receipts } = useSelector((state) => state.subscription);
  console.log(receipts, "receipts");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.uid) {
      dispatch(getReceipts(user?.uid));
    }
  }, [user]);

  return (
    <div>
      <HeroSection />
      {receipts?.length > 0 && receipts?.subscriptionStatus != "completed" ? (
        <OfferSubscription />
      ) : (
        <WhatWeOffer />
      )}
      <SupportedBrand />
      <FAQSection />
    </div>
  );
}
