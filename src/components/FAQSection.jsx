"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CircleMinus, CirclePlus } from "lucide-react";
import CompLayout from "./CompLayout";
import { Plus, X } from "lucide-react";

const faqs = [
  {
    question: "What is this tool used for?",
    answer:
      "This tool helps you create professional, customizable receipts for personal, business, or educational use in just seconds.",
  },
  {
    question: "Can I customize my receipt with logos or company info?",
    answer:
      "Yes! You can upload your logo, edit company details, change dates, line items, taxes, currency, and more.",
  },
  {
    question: "Is my information safe?",
    answer: "Yes. We don’t store your receipt data.",
  },
  {
    question: "Can I use this on mobile?",
    answer:
      "Yes. Our receipt generator is fully mobile-responsive and works great on phones and tablets.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState("");
  const [openIndex, setOpenIndex] = useState(); // Default open index for second item

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className=" py-16 mt-12 px-4 text-center">
      <h2 className="font-bold text-[30px] md:text-[48px] leading-[100%] tracking-[-0.4%]  mb-5 text-[#373072]">
        Frequently Asked Questions
      </h2>
      <div className="max-w-2xl mx-auto rounded-xl p-5 text-left border border-white bg-white/70 backdrop-blur-md shadow-[0px_12px_56px_0px_rgba(6,28,61,0.08),0px_-20px_220px_0px_rgba(73,53,255,0.35)]">
        {faqs.map((faq, index) => (
          <div key={index} className={`text-left`}>
            <button
              className={` ${
                openIndex === index ? "bg-[#6259B5] rounded-t-lg" : ""
              } w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none`}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            >
              <span
                className={`font-semibold text-lg leading-[26px] tracking-normal ${
                  openIndex === index ? "text-white" : "text-[#4C4C4C]"
                }`}
              >
                {faq.question}
              </span>
              {openIndex === index ? (
                <X className="w-5 h-5 text-white stroke-[3]" />
              ) : (
                <Plus className="w-5 h-5 text-[#B4BBC5] stroke-[3]" />
              )}
            </button>
            {openIndex === index && faq.answer && (
              <div className="px-6 py-3 text-[#061C3D] font-normal text-base leading-6 tracking-normal bg-[#FAFAFA] rounded-b-lg">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
