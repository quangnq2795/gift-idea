import React from "react";
import Image from "next/image";

interface ImageModalProps {
  selectedIndex: number;
  images: { id: number; url: string; alt: string }[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  selectedIndex,
  images,
  onClose,
  onNext,
  onPrev,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div className="relative w-auto max-w-3xl flex items-center">
        {/* Back Button (Smaller Triangle) */}
        <button
          className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 w-0 h-0 
                         border-y-[15px] border-y-transparent 
                         border-r-[25px] border-r-white opacity-80 
                         hover:opacity-100 transition-all"
          onClick={(e) => {
            e.stopPropagation(); // Prevent modal from closing
            onPrev();
          }}
        />

        {/* Image Display */}
        <Image
          src={images[selectedIndex].url}
          alt="Enlarged image"
          width={500}
          height={500}
          className="rounded-lg"
        />

        {/* Next Button (Smaller Triangle) */}
        <button
          className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 w-0 h-0 
                         border-y-[15px] border-y-transparent 
                         border-l-[25px] border-l-white opacity-80 
                         hover:opacity-100 transition-all"
          onClick={(e) => {
            e.stopPropagation(); // Prevent modal from closing
            onNext();
          }}
        />

        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-white text-2xl font-bold"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
