"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";

interface NarBarSearchCardList {
  title: string;
  image: string;
}

interface NarbarSearchSuggestionDefaultProps {
  onCardClick?: (title: string) => void;
}

export default function NarbarSearchSuggestionDefault({
  onCardClick,
}: NarbarSearchSuggestionDefaultProps) {
  const router = useRouter();
  const [cardList, setCardList] = useState<NarBarSearchCardList[]>([]);

  const smallScreenCount = 6;
  const largeScreenCount = 10;

  const handleCardClick = (title: string) => {
    if (onCardClick) {
      onCardClick(title);
    }
    console.log("Navigating to:", `/search?q=${encodeURIComponent(title)}`);
    router.push(`/search?q=${encodeURIComponent(title)}`);
  };

  useEffect(() => {
    const fetchCardList = async () => {
      try {
        const response = await fetch("/api/search/card-list");
        const data = await response.json();
        setCardList(data);
      } catch (error) {
        console.error("Failed to fetch card list:", error);
      }
    };

    fetchCardList();
  }, []);

  const renderCard = (item: NarBarSearchCardList, index: number) => (
    <div className="relative" key={index}>
      <Card
        shadow="sm"
        isPressable
        className="w-full"
        onPress={() => handleCardClick(item.title)}
      >
        <CardBody className="overflow-visible p-0">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={item.title}
            className="w-full object-cover h-[100px]"
            src={item.image}
            loading="lazy"
          />
        </CardBody>
        <CardFooter className="text-small justify-between">
          <b>{item.title}</b>
        </CardFooter>
      </Card>
    </div>
  );

  return (
    <div className="p-2">
      {/* Desktop layout */}
      <div className="hidden md:grid md:grid-cols-5 md:gap-2">
        {cardList.slice(0, largeScreenCount).map(renderCard)}
      </div>

      {/* Mobile layout */}
      <div className="grid grid-cols-3 gap-2 md:hidden">
        {cardList.slice(0, smallScreenCount).map(renderCard)}
      </div>
    </div>
  );
}
