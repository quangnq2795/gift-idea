import React, { useState } from "react";
import Image from "next/image";
import { ProductImages } from "@/types";
import { AddImageIcon, RemoveImageIcon } from "@/components/icons"; // Import your custom icons

export const ImageGridEdit: React.FC<ProductImages> = ({ images: initialImages }) => {
  const maxImages = 4;
  const [images, setImages] = useState(initialImages);

  const handleRemoveImage = (id: string) => {
    setImages(images.filter((image) => image.id !== id));
  };

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    if (!file) return;

    const newImage = {
      id: `${Date.now()}`,
      url: URL.createObjectURL(file),
      alt: "Uploaded image",
      file,
    };

    setImages((prevImages: any[]) => [...prevImages, newImage].slice(0, maxImages));
  };

  return (
    <div className="grid grid-cols-2 gap-2 p-2">
      {images.map((image) => (
        <div key={image.id} className="relative group overflow-hidden h-[400px]">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover cursor-pointer"
          />
          {/* Remove Button */}
          <button
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
            onClick={() => handleRemoveImage(image.id)}
          >
            <RemoveImageIcon />
          </button>
        </div>
      ))}

      {/* Upload Button */}
      {images.length < maxImages && (
        <label className="flex items-center justify-center border border-dashed rounded-md w-full h-[400] bg-gray-100 hover:bg-gray-200 transition cursor-pointer">
          <AddImageIcon className="w-10 h-10 text-gray-500" />
          <input type="file" accept="image/*" className="hidden" onChange={handleAddImage} />
        </label>
      )}
    </div>
  );
};
