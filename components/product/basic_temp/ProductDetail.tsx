import React from "react";
import { Avatar } from "@nextui-org/react";
import { ImageGrid } from "./ImageGrid/ImageGrid";
import { Description } from "./Description";

interface ProductDetailProps {
  product: {
    id: number;
    storeName: string;
    productName: string;
    description: string;
    price: number;
    images: { id: number; url: string; alt: string }[];
    shopee?: string;
    facebook?: string;
  };
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex flex-col w-full max-w-2xl border rounded-md shadow-lg p-6 bg-white">
        <div className="flex flex-col space-y-4">
          {/* Store Name with Avatar */}
          <div className="flex items-center space-x-4">
            <Avatar
              isBordered
              color="primary"
              src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
            />
            <h1 className="text-xl font-bold text-gray-800 truncate">
              {product.storeName}
            </h1>
          </div>

          {/* Product Name */}
          <p className="font-semibold text-lg truncate w-full">
            {product.productName}
          </p>

          {/* Description */}
          <Description description={product.description} />

          {/* Social Links (Shopee & Facebook) */}
          {(product.shopee || product.facebook) && (
            <div className="flex space-x-2">
              {product.shopee && (
                <a
                  href={product.shopee}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600 transition"
                >
                  🛒 Buy on Shopee
                </a>
              )}
              {product.facebook && (
                <a
                  href={product.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
                >
                  🔵 View on Facebook
                </a>
              )}
            </div>
          )}

          {/* Price */}
          <p className="mt-2 text-sm font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* Images */}
        <div className="mt-4 max-h-100">
          <ImageGrid images={product.images} />
        </div>
      </div>
    </div>
  );
};
