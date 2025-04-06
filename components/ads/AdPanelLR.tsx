"use client";

import React from "react";

type AdPanelProps = {
  position: "left" | "right";
};

export const AdPanelLR: React.FC<AdPanelProps> = ({ position }) => {
  return (
    <div
      className={`fixed top-1/2 transform -translate-y-1/2 ${position === "left" ? "left-0" : "right-0"} 
        w-[300px] h-[600px] bg-gray-200 flex items-center justify-center shadow-lg z-50`}
    >
      <p className="text-sm text-gray-700">Ad Space</p>
    </div>
  );
};
