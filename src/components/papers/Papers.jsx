"use client";
import React from "react";
import { useSelector } from "react-redux";
import WhatWeOffer from "../WhatWeOffer";
import PaperSubscription from "./PaperSubscription";
import MianPapers from "./MianPapers";
export default function Papers() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      {
        <MianPapers />

        //   user && !user?.uid  ? <PaperSubscription/> :
      }
    </div>
  );
}
