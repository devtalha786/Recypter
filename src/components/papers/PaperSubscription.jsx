"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useState } from "react";
import LoginModal from "../LoginModal";
import { Button } from "../ui/button";

// Initialize Stripe outside of component
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const PaperSubscriptionContent = () => {
  const stripe = useStripe();

  const { user } = useSelector((state) => state.auth);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const subscriptionPlans = [
    {
      title: "$20 For Lifetime",
      type: "For LifeTime Papers",
      service: "Papers",
      features: [
        "Make Paper receipts forever no limit!",
        "Apple",
        "StockX",
        "Nike",
      ],
      price: "$20",
      period: "For LifeTime Papers",
    },
  ];

  const handleCheckout = async (plan) => {
    if (!user?.uid) {
      setIsLoginModalOpen(true);
      return;
    }
    try {
      console.log(plan, "plan===>");
      // Call your backend API to create a Stripe checkout session
      const response = await axios.post("/api/create-checkout-session", {
        plan,
        userId: user?.uid,
        email: user?.email,
      });
      console.log(response, "response===>");

      // Remove the .json() call since axios already parses the JSON
      const session = response.data;
      console.log("session===>", session);

      // // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="py-16 px-4">
        <h2 className="text-5xl font-bold text-[#393274] text-center mb-12">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 w-1/2 gap-6  mx-auto">
          {subscriptionPlans?.map((plan, index) => (
            <div
              key={index}
              className="bg-[#eef2ff] rounded-lg p-6 flex flex-col  justify-between hover:transform hover:scale-105 transition-transform duration-300"
            >
              <div>
                <h3 className="text-[28px] font-bold text-[#6259b5] mb-4">
                  {plan?.title}
                </h3>
                <ul className="space-y-2 mb-6">
                  {plan?.features?.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-gray-600 font-bold flex items-center"
                    >
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                type="button"
                onClick={() => handleCheckout(plan)}
                className="w-full bg-[#6259b5] hover:bg-[#6259b5] text-white py-2 rounded-lg   transition-colors duration-300"
              >
                Buy Now!
              </Button>
            </div>
          ))}
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
    </>
  );
};

// Wrap the component with Elements provider
const PaperSubscription = () => (
  <Elements stripe={stripePromise}>
    <PaperSubscriptionContent />
  </Elements>
);

export default PaperSubscription;
