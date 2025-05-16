import React from "react";

interface DescriptionEditProps {
  description: string;
  onUpdate: (newDescription: string) => void;
}

export const DescriptionEdit: React.FC<DescriptionEditProps> = ({
  description,
  onUpdate,
}) => {
  return (
    <div className="mb-2">
      <textarea
        value={description}
        onChange={(e) => onUpdate(e.target.value)}
        className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[300px] text-sm"
        placeholder="Enter product description..."
        spellCheck="false"
      />
    </div>
  );
}; 