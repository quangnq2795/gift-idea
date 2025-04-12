import React, { useState } from "react";
import { useProductViewMode } from "@/components/product/ProductViewModeContext";

interface DescriptionProps {
  description: string;
}

export const Description: React.FC<DescriptionProps> = ({ description }) => {
  const { viewMode } = useProductViewMode();
  const isEditMode = viewMode === "edit";

  const [expanded, setExpanded] = useState(false);
  const [editableDescription, setEditableDescription] = useState(description);

  return (
    <div className="mb-2">
      {isEditMode ? (
        <textarea
          value={editableDescription}
          onChange={(e) => setEditableDescription(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full h-60 resize-none"
        />
      ) : (
        <div
          className={`relative whitespace-pre-wrap transition-all duration-300 text-black text-sm ${
            expanded
              ? "max-h-none overflow-y-auto"
              : "line-clamp-[15] overflow-hidden"
          }`}
        >
          {description}
        </div>
      )}

      {!isEditMode && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-500 hover:underline mt-2 block"
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};
