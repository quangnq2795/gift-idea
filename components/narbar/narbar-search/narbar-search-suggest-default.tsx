"use client";

import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import useCardList from "./useCardList";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export default function NarbarSearchSuggestionDefault() {
  const router = useRouter();
  const cardList = useCardList();

  const smallScreenCount = 6;
  const largeScreenCount = 10;

  const handleCardClick = useCallback(
    (title: string) => {
      router.push(`/search?q=${encodeURIComponent(title)}`);
    },
    [router]
  );

  const renderCard = (item: { title: string; image: string }, index: number) => (
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
            className="w-full object-cover h-[60px] md:h-[100px] "
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
