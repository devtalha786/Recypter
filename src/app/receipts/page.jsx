

import { ScrollToSection } from "@/utils/HelperFunctions";
import { Button } from "@/components/ui/button";
import WhatWeOffer from "@/components/WhatWeOffer";
import OfferSubscription from "@/components/OfferSubscription";
import { useSelector } from "react-redux";
import MainHome from "@/components/home/Home";
import Receipts from "@/components/receipts/Receipts";

const ReceiptsPage = () => {

  
  return (
    <div className="min-h-screen  bg-[#fffcf1] text-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
       <Receipts/>
      </div>
    </div>
  );
};

export default ReceiptsPage;
