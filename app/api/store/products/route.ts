import { NextResponse } from 'next/server';

import { StoreProductItemProps } from '@/components/store/StoreProductItem';

// Array of image sources
const imgSrcArray = [
  "https://i.pinimg.com/236x/ac/4d/93/ac4d938a6b3f44bce75b38b15c06f367.jpg",
  "https://i.pinimg.com/236x/28/a1/de/28a1de99f71a6dd6827a42bb7a87676a.jpg",
  "https://i.pinimg.com/474x/71/ff/30/71ff302256dd5b0246acf2d632879a62.jpg",
  "https://i.pinimg.com/236x/9d/70/a6/9d70a6795e0badf6d7e97cfecd273367.jpg",
  "https://i.pinimg.com/236x/65/c1/d6/65c1d622b51982c6f1cbaa7d10776c52.jpg",
  "https://i.pinimg.com/236x/aa/3d/9a/aa3d9a46a8f92f80c3827414a44d6b75.jpg",
  "https://i.pinimg.com/236x/31/19/87/3119879c0aab8878b7f856b89a498c3b.jpg",
  "https://i.pinimg.com/236x/00/c0/c7/00c0c7fe72f33419edc9594d496b2d34.jpg",
  "https://i.pinimg.com/236x/4c/41/39/4c413960ce698b2d23b628f1f6855c8d.jpg",
  "https://i.pinimg.com/474x/c9/bd/19/c9bd1943279dca6fdba1cc2651d236cc.jpg",
  "https://i.pinimg.com/236x/84/05/ca/8405cab7b29d2ca336d27638ad6d15b4.jpg",
  "https://i.pinimg.com/236x/18/92/f3/1892f3b3da3fbdce1cf971e5735bf798.jpg",
  "https://i.pinimg.com/474x/02/35/21/023521dabb7cd66f20f9ff2f2501745b.jpg"
];

// Generate a list of 200 items
const allItems: StoreProductItemProps[] = Array.from({ length: 200 }, (_, index) => {
  return {
    imgSrc: imgSrcArray[index % imgSrcArray.length],
    productId: (index + 1).toString(),
  };
});

// Number of items per page
const ITEMS_PER_PAGE = 30;

// Handle GET requests with pagination
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page')) || 0;

  // Calculate the start and end indices for pagination
  const startIndex = page * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = allItems.slice(startIndex, endIndex);

  return NextResponse.json({
    data: paginatedItems,
    hasMore: endIndex < allItems.length, // Check if more data is available
  });
}
