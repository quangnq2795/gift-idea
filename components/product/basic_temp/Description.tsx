import React, { useState } from "react";

interface DescriptionProps {
  description: string;
}

export const Description: React.FC<DescriptionProps> = ({ description }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-2">
      <div
        className={`relative whitespace-pre-wrap transition-all duration-300 text-black text-sm ${
          expanded
            ? "max-h-none overflow-y-auto"
            : "line-clamp-[15] overflow-hidden"
        }`}
      >
        {description}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-blue-500 hover:underline mt-2 block text-sm"
      >
        {expanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};