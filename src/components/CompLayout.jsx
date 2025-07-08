"use client"
import React from "react";

const CompLayout = ({ title, description, children, content }) => {
  return (
    <section  className="py-12 px-4">
      <div className="text-center space-y-4">
        <h2 className="inline-block text-3xl font-bold relative mb-4">
          <span className="bg-colorTheme-primary rounded-lg px-3 py-1">{title}</span>
        </h2>
        <p className="max-w-4xl mx-auto text-xl font-medium ">{description}</p>
          <div className="py-12">{children}</div> 
        <p className="max-w-4xl mx-auto text-xl font-medium">{content}</p>
      </div>
    </section>
  );
};

export default CompLayout;
