import React, { memo } from "react";
import Image from "next/image";
import { AddImageIcon, RemoveImageIcon } from "@/components/icons";

interface ImageGridEditProps {
  images: { id: number; url: string; alt: string }[];
  maxImages: number;
  onRemoveImage: (id: number) => void;
  onAddImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageGridEdit: React.FC<ImageGridEditProps> = memo(function ImageGridEdit({
  images,
  maxImages,
  onRemoveImage,
  onAddImage,
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {images.map((image) => (
        <div 
          key={image.id} 
          className="relative aspect-square group overflow-hidden rounded-lg shadow-md"
        >
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
            className="object-cover"
            unoptimized={image.url.startsWith('blob:')}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200">
            <button
              onClick={() => onRemoveImage(image.id)}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              aria-label="Remove image"
            >
              <RemoveImageIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}

      {images.length < maxImages && (
        <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2">
          <AddImageIcon className="w-8 h-8 text-gray-400" />
          <span className="text-sm text-gray-500">Add Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={onAddImage}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
});