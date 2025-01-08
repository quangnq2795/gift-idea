import React, { useState } from "react";
import {Image} from "@nextui-org/image";

interface ProductDetailProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    images: { id: number; url: string; alt: string }[];
  };
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0].url); // Initialize with the first image

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-12 p-6">
      <div className="w-full lg:w-1/2 flex flex-col items-center space-y-6">
        <div className="w-full flex justify-center rounded-md p-4">
          <Image
            src={selectedImage}
            alt="Selected product"
            height={400}
            className="object-contain"
          />
        </div>

        {/* Image Thumbnails */}
        <div className="flex space-x-2">
          {product.images.map((image) => (
            <div
              key={image.id}
              className={`border rounded-md p-2 cursor-pointer hover:shadow-lg ${
                selectedImage === image.url ? "border-blue-500" : "border-none"
              }`}
              onClick={() => setSelectedImage(image.url)}
            >
              <Image
                src={image.url}
                alt={image.alt}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Details */}
      <div className="w-full lg:w-1/2 flex flex-col space-y-6">
        {/* Product Title and Price */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg font-semibold text-blue-600 mt-2">${product.price.toFixed(2)} USD</p>
        </div>

        {/* Description */}
        <div>
          <p className="text-gray-600">{product.description}</p>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md shadow-md transition duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  );
};
