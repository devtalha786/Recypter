import React from "react";

const MessageCard = ({ children }) => {
  return (
    <div className="relative">
      {/* Main testimonial box */}
      <div className="bg-colorTheme-secondary p-8 rounded-[32px] border border-colorTheme-primary  relative mb-8">
        <p className="text-white text-md leading-relaxed">{children} </p>
      </div>
      {/* Triangle pointer */}
      <div className="absolute bottom-3 left-20  transform -translate-x-1/2 translate-y-full">
        <div className="w-6 h-6 bg-colorTheme-secondary border-l border-b border-colorTheme-primary -rotate-45"></div>
      </div>
    </div>
  );
};

export default MessageCard;
