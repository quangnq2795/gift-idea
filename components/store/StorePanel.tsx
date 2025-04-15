import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

type StorePanelProps = {
  storeId: string;
};

export const StorePanel: React.FC<StorePanelProps> = ({ storeId }) => {
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch image data
  useEffect(() => {
    if (!storeId) return;

    fetch(`/api/store/panel?storeId=${storeId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.every((img) => typeof img.url === "string")) {
          setImages(data.map((img) => img.url));
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((err) => console.error("Error loading images:", err));
  }, [storeId]);

  // Slideshow logic
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false); // prevent memory leaks
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;

    intervalRef.current = setInterval(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        if (isMounted) {
          setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }
      }, 500); // match fade-out duration
    }, 5000);

    return () => {
      clearInterval(intervalRef.current!);
      clearTimeout(timeoutRef.current!);
    };
  }, [images, isMounted]);

  return (
    <div className="w-full h-[400px] relative overflow-hidden rounded-lg shadow-lg">
      {images.length > 0 ? (
        images.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={`Panel ${idx}`}
            fill
            priority={idx === 0}
            loading={idx === 0 ? "eager" : "lazy"}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))
      ) : (
        <p className="text-sm text-gray-700">Loading ads...</p>
      )}
    </div>
  );
};
