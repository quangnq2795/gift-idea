"use client";

import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import useCardList from "./useCardList";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export default function NarbarSearchSuggestionDefault() {
  const router = useRouter();
  const cardList = useCardList();

  const smallScreenCardCount = 8;
  const largeScreenCardCount = 10;

  const handleCardPress = useCallback((title: string) => {
    router.push(`/search?q=${encodeURIComponent(title)}`);
  }, [router]);

  const generateCardElements = (count: number) => {
    return cardList.slice(0, count).map((item, index) => (
      <div className="relative" key={index}>
        <Card
          shadow="sm"
          isPressable
          className="w-full"
          onPress={() => handleCardPress(item.title)}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover"
              src={item.image}
              loading="lazy"
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
          </CardFooter>
        </Card>
      </div>
    ));
  };

  return (
    <div className="p-2">
      <div className="hidden md:grid md:grid-cols-5 md:gap-2">
        {generateCardElements(largeScreenCardCount)}
      </div>

      <div className="block md:hidden grid grid-cols-4 gap-2">
        {generateCardElements(smallScreenCardCount)}
      </div>
    </div>
  );
}
