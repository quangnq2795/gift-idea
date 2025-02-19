import React, { useState } from "react";
import Image from "next/image";
import { ProductImages } from "@/types";
import ImageModal from "./ImageModal"; // Import the new ImageModal component

export const ImageGrid4: React.FC<ProductImages> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length !== 4) return null;

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-2 h-[400px] overflow-hidden">
        {/* Left Column - Large Image */}
        <div className="col-span-2 h-full relative">
          <Image
            src={images[0].url}
            alt={images[0].alt}
            fill
            className="object-cover cursor-pointer"
            onClick={() => setSelectedIndex(0)}
          />
        </div>

        {/* Right Column - 3 Images Stacked */}
        <div className="grid grid-rows-3 gap-2 h-full">
          {images.slice(1).map((image, index) => (
            <div
              key={image.id}
              className="relative h-full w-full cursor-pointer"
              onClick={() => setSelectedIndex(index + 1)}
            >
              <Image src={image.url} alt={image.alt} fill className="object-cover" />
            </div>
          ))}
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
