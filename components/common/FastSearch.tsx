'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardFooter, Image } from "@heroui/react";

interface FastSearchItem {
  title: string;
  image: string;
}

export default function FastSearch() {
  const [items, setItems] = useState<FastSearchItem[]>([]);
  const [visibleItems, setVisibleItems] = useState<FastSearchItem[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const router = useRouter();

  // Update screen size state
  useEffect(() => {
    const updateScreenSize = () => {
      const small = window.innerWidth < 640;
      setIsSmallScreen(small);
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Fetch and slice items
  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch('/api/search/fast-search');
        if (!res.ok) throw new Error('Failed to load data');
        const data: FastSearchItem[] = await res.json();
        setItems(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchItems();
  }, []);

  // Adjust visible items when screen size or data changes
  useEffect(() => {
    const max = 12; // Always load 12 items
    setVisibleItems(items.slice(0, max));
  }, [isSmallScreen, items]);

  // Split into 3 rows of 4 for small screens, 2 rows of 6 for larger
  const rowSize = isSmallScreen ? 4 : 6;
  const rows = [
    visibleItems.slice(0, rowSize),
    visibleItems.slice(rowSize, rowSize * 2),
    isSmallScreen ? visibleItems.slice(rowSize * 2, rowSize * 3) : []
  ];

  const renderRow = (row: FastSearchItem[], rowIndex: number) => (
    <div
      key={rowIndex}
      className={`grid gap-4 ${isSmallScreen ? 'grid-cols-4' : 'grid-cols-6'}`}
    >
      {row.map((item, index) => (
        <Card
          key={index}
          isPressable
          shadow="sm"
          onPress={() => router.push(`/search?q=${encodeURIComponent(item.title)}`)}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              alt={item.title}
              className="w-full aspect-[4/3] object-cover"
              radius="lg"
              shadow="sm"
              src={item.image}
            />
          </CardBody>
          <CardFooter className="flex items-center justify-between text-xs">
            <div className="flex justify-center w-full">
                <b>{item.title}</b>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      {rows.map((row, idx) => row.length > 0 && renderRow(row, idx))}
    </div>
  );
}
