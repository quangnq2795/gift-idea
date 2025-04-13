"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

type AdPanelProps = {
  fetchUrl?: string;
  animationDuration?: number; // Duration for fade animation in milliseconds
  intervalDuration?: number; // Duration for image change interval in milliseconds
};

export const AdPanelHomeMain: React.FC<AdPanelProps> = ({
  fetchUrl = "/api/ads/home/main",
  animationDuration = 500,
  intervalDuration = 5000,
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch images from the API
  useEffect(() => {
    fetch(fetchUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.every((item) => typeof item.url === "string")) {
          setImages(data.map((img) => img.url));
        } else {
          throw new Error("Invalid data format");
        }
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setError("Failed to load ads. Please try again later.");
      });
  }, [fetchUrl]);

  // Handle image transitions
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true);
      }, animationDuration);
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [images, animationDuration, intervalDuration]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div
      className="w-full h-[300px] relative overflow-hidden rounded-lg shadow-lg"
      aria-live="polite"
    >
      {images.length > 0 ? (
        <div className="w-full h-full relative">
          <Image
            src={images[currentImageIndex]}
            alt={`Ad ${currentImageIndex + 1}`}
            fill
            className={`w-full h-full object-cover transition-opacity duration-${animationDuration} ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      ) : (
        <p className="text-sm text-gray-700">Loading ads...</p>
      )}
    </div>
  );
};