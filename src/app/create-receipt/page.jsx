"use client";
import ReceiptForm from "@/components/ReceiptForm";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";



const CreateReceiptPage = () => {
  const [selectedBrand, setSelectedBrand] = useState("");

  const brands = [
    "stockx_new_ordered",
    "stockx_new_verified",
    "apple",
    "amazon", "balenciaga", "bape", "dior", "dyson",
    "ebay", "farfetch", "goat", "grail-point", "grailed",
    "louis-vuitton", "moncler", "nike", "off-white", "prada", "supreme"
  ];

 

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#3288dd] text-white pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-inherit">
        {/* Brand Selection Dropdown */}
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="w-full p-2 mb-8 rounded text-black"
        >
          <option value="">Select a brand</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand.charAt(0).toUpperCase() + brand.slice(1).replace('-', ' ')}
            </option>
          ))}
        </select>

        {/* Receipt Form Section */}
        {selectedBrand && <ReceiptForm brand={selectedBrand} />}
      </div>
    </div>
  );
};

export default CreateReceiptPage;