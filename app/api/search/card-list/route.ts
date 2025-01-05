import { NextResponse } from 'next/server';

const cardList = [
  {
    title: 'Card 1',
    image: 'https://via.placeholder.com/150',
  },
  {
    title: 'Card 2',
    image: 'https://via.placeholder.com/150',
  },
  {
    title: 'Card 3',
    image: 'https://via.placeholder.com/150',
  },
  {
    title: 'Card 4',
    image: 'https://via.placeholder.com/150',
  },
  {
    title: 'Card 5',
    image: 'https://via.placeholder.com/150',
  },
  {
    title: 'Card 6',
    image: 'https://via.placeholder.com/150',
  },
  {
    title: 'Card 7',
    image: 'https://via.placeholder.com/150',
  },
  {
    title: 'Card 8',
    image: 'https://via.placeholder.com/150',
  },
  {
    title: 'Card 9',
    image: 'https://via.placeholder.com/150',
  },
  {
    title: 'Card 10',
    image: 'https://via.placeholder.com/150',
  },
  {
    title: 'Card 11',
    image: 'https://via.placeholder.com/150',
  },
];

// Handle GET requests
export async function GET() {
  return NextResponse.json(cardList);
}
