import React, { useState } from "react";
import Image from "next/image";
import { ProductImages } from "@/types";
import ImageModal from "./ImageModal"; // Import the ImageModal component

export const ImageGrid2: React.FC<ProductImages> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length !== 2) return null;

  const handleNext = () => {
    if (selectedIndex === 0) {
      setSelectedIndex(1); // Go to the next image (index 1)
    }
  };

  const handlePrev = () => {
    if (selectedIndex === 1) {
      setSelectedIndex(0); // Go to the previous image (index 0)
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-2 h-[400px] overflow-hidden">
        {/* Left Column - Large Image */}
        <div className="col-span-1 h-full relative">
          <Image
            src={images[0].url}
            alt={images[0].alt}
            fill
            className="object-cover cursor-pointer"
            onClick={() => setSelectedIndex(0)} // Click to open modal
          />
        </div>

        {/* Right Column - Second Image */}
        <div className="relative h-full w-full">
          <Image
            src={images[1].url}
            alt={images[1].alt}
            fill
            className="object-cover cursor-pointer"
            onClick={() => setSelectedIndex(1)} // Click to open modal
          />
        </div>
      </div>

      {/* Modal for Enlarged Image */}
      {selectedIndex !== null && (
        <ImageModal
          selectedIndex={selectedIndex}
          images={images}
          onClose={() => setSelectedIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </>
  );
};
