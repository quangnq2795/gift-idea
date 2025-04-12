import React, { useState } from "react";
import Image from "next/image";
import { ProductImages } from "@/types";
import { AddImageIcon, RemoveImageIcon } from "@/components/icons";
import { useProductInfo } from "@/components/product/ProductInfoContext";

export const ImageGridEdit: React.FC = () => {
  const maxImages = 4;

  // Access product info and updater from context
  const { product, updateProduct } = useProductInfo();
  const [images, setImages] = useState(product.images || []);

  const handleRemoveImage = (id: string) => {
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);
    updateProduct({ images: updatedImages }); // Update product info in context
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

    const updatedImages = [...images, newImage].slice(0, maxImages);
    setImages(updatedImages);
    updateProduct({ images: updatedImages }); // Update product info in context
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
        <label className="flex items-center justify-center border border-dashed rounded-md w-full h-[400px] bg-gray-100 hover:bg-gray-200 transition cursor-pointer">
          <AddImageIcon className="w-10 h-10 text-gray-500" />
          <input type="file" accept="image/*" className="hidden" onChange={handleAddImage} />
        </label>
      )}
    </div>
  );
};