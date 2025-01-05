import React from "react";

interface ProductDetailProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    images: { id: number; url: string; alt: string }[];
    video?: string; // Optional video link
  };
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-xl font-semibold mb-6">
        Price: <span className="text-green-600">${product.price.toFixed(2)}</span>
      </p>

      <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {product.images.map((image) => (
          <div
            key={image.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md"
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-40 object-cover"
            />
          </div>
        ))}
      </div>

      {product.video && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Product Video</h3>
          <iframe
            className="w-full aspect-video rounded-lg shadow-md"
            src={product.video}
            title="Product Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};
