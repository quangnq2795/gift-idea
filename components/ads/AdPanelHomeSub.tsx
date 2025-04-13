"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Ad {
  id: string;
  url: string;
  description: string;
}

const AdPanelHomeSub: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch("/api/ads/home/sub");
        if (!response.ok) throw new Error("Failed to fetch ads");
        const data: Ad[] = await response.json();
        setAds(data);
      } catch (err) {
        console.error("Error fetching ads:", err);
        setError("Failed to load ads. Please try again later.");
      }
    };

    fetchAds();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex w-full h-[250px] gap-2">
      {ads.map((ad) => (
        <div
          key={ad.id}
          className="flex-1 relative rounded-lg overflow-hidden shadow-md border"
        >
          <Image
            src={ad.url}
            alt={ad.description}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default AdPanelHomeSub;