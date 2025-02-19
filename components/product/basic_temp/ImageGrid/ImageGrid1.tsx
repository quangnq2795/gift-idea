import React, { useState } from "react";
import Image from "next/image";
import { ProductImages } from "@/types";
import ImageModal from "./ImageModal";

export const ImageGrid1: React.FC<ProductImages> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length !== 1) return null;

  const handleNext = () => {
    setSelectedIndex(0);
  };

  const handlePrev = () => {
    setSelectedIndex(0);
  };

  return (
    <>
      <div className="h-[400px] overflow-hidden">
        <div className="h-full relative">
          <Image
            src={images[0].url}
            alt={images[0].alt}
            fill
            className="object-cover cursor-pointer"
            onClick={() => {
              setSelectedIndex(0);
            }}
          />
        </div>
      </div>

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
