"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

type AdPanelProps = {
  fetchUrl?: string;
};

export const AdPanelT: React.FC<AdPanelProps> = ({ fetchUrl = "/api/ads/home" }) => {
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Log the data
        if (Array.isArray(data)) {
          setImages(data.map((img) => img.url)); // Ensure correct mapping
        } else {
          console.error("Invalid data format:", data);
          setImages([]);
        }
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, [fetchUrl]);
  

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="w-full h-[400px] relative overflow-hidden rounded-lg shadow-lg">
      {images.length > 0 ? (
        <div className="w-full h-full relative">
          <Image
            src={images[currentImageIndex]}
            alt="Store Panel"
            fill
            className={`w-full h-full object-cover transition-opacity duration-1000 ${fade ? "opacity-100" : "opacity-0"}`}
          />
        </div>
      ) : (
        <p className="text-sm text-gray-700">Loading ads...</p>
      )}
    </div>
  );
};
