import React, { useState } from "react";
import { Image } from "@nextui-org/image";

interface ProductDetailProps {
  product: {
    id: number;
    store_name: string;
    product_name: string;
    description: string;
    price: number;
    images: { id: number; url: string; alt: string }[];
  };
}

const ImageGrid = ({ images }) => {
  if (!images || images.length === 0) {
    return <div className="text-gray-500">No images available.</div>;
  }

  const imageStyles = {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  };

  if (images.length === 1) {
    return <Image src={images[0].url} alt={images[0].alt} className="rounded-lg" style={imageStyles} />;
  }

  if (images.length === 2) {
    return (
      <div className="flex gap-2">
        {images.map((image) => (
          <div key={image.id} className="w-1/2 rounded-lg overflow-hidden">
            <Image src={image.url} alt={image.alt} style={imageStyles} />
          </div>
        ))}
      </div>
    );
  }

  if (images.length === 3) {
    return (
      <div className="flex gap-2">
        <div className="w-2/3 rounded-lg overflow-hidden">
          <Image src={images[0].url} alt={images[0].alt} style={imageStyles} />
        </div>
        <div className="w-1/3 flex flex-col gap-2">
          {images.slice(1).map((image) => (
            <div key={image.id} className="h-1/2 rounded-lg overflow-hidden">
              <Image src={image.url} alt={image.alt} style={imageStyles} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const gridCols = images.length === 4 ? 2 : 3;
  return (
    <div className={`grid grid-cols-${gridCols} gap-2`}>
      {images.map((image) => (
        <div key={image.id} className="rounded-lg overflow-hidden">
          <Image src={image.url} alt={image.alt} style={imageStyles} />
        </div>
      ))}
    </div>
  );
};

const Description: React.FC<{ description: string }> = ({ description }) => {
  const [expanded, setExpanded] = useState(false);
  const maxLines = 8;

  const lines = description.split('\n');
  const isTruncated = lines.length > maxLines;

  const displayedDescription = expanded
    ? description
    : isTruncated
    ? lines.slice(0, maxLines).join('\n') + '...'
    : description;

  return (
    <div>
      <p className="whitespace-pre-wrap">{displayedDescription}</p>
      {isTruncated && (
        <button onClick={() => setExpanded(!expanded)} className="text-blue-500 hover:underline">
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex flex-col w-full max-w-2xl border rounded-md shadow-lg p-6 bg-white">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row items-center">
            <h1 className="text-xl font-bold text-gray-800 break-words line-clamp-2">
              {product.store_name}
            </h1>
          </div>
          <div>
            <p className="font-semibold text-lg">{product.product_name}</p>
            <Description description={product.description} />
            <p className="mt-2 text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
          </div>
        </div>
        <div className="mt-6">
          <ImageGrid images={product.images} />
        </div>
      </div>
    </div>
  );
};