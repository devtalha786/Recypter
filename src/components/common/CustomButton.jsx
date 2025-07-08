import React from "react";
import { Button } from "../ui/button";

const CustomButton = ({ text, onClick }) => {
  return (
    <Button
      className="bg-colorTheme-primary hover:bg-lime-500 text-black  rounded-2xl px-12 py-8 text-lg font-normal"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
