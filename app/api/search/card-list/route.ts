import { NextResponse } from 'next/server';

const cardList = [
  {
    title: 'Card 1',
    image: 'https://i.pinimg.com/736x/83/ea/52/83ea52926c9b0315cbafbdcd16850fd4.jpg',
  },
  {
    title: 'Card 2',
    image: 'https://i.pinimg.com/736x/92/ed/6f/92ed6f46fff4b34892f22c1d921f620b.jpg',
  },
  {
    title: 'Card 3',
    image: 'https://i.pinimg.com/736x/62/e9/82/62e9823ad63abf2a1e4aba7488c63b94.jpg',
  },
  {
    title: 'Card 4',
    image: 'https://i.pinimg.com/736x/dc/f5/d9/dcf5d9dd0336751ca459f0a84f038744.jpg',
  },
  {
    title: 'Card 5',
    image: 'https://i.pinimg.com/736x/45/ce/b4/45ceb4bf63318ce1a8ddef7427c2e71e.jpg',
  },
  {
    title: 'Card 6',
    image: 'https://i.pinimg.com/736x/20/7e/b7/207eb7d84d400cccaad33930d1e30de0.jpg',
  },
  {
    title: 'Card 7',
    image: 'https://i.pinimg.com/736x/18/50/99/185099422f04c864dc4c32dce4db73dc.jpg',
  },
  {
    title: 'Card 8',
    image: 'https://i.pinimg.com/736x/c0/cb/4b/c0cb4b066d9fb238c6373bc02c35a8d9.jpg',
  },
  {
    title: 'Card 9',
    image: 'https://i.pinimg.com/736x/9c/7f/59/9c7f599d75b4de0ff90312f3da5b3a13.jpg',
  },
  {
    title: 'Card 10',
    image: 'https://i.pinimg.com/736x/29/85/ae/2985ae8ef7683f84498143b7079ba85e.jpg',
  },
];

// Handle GET requests
export async function GET() {
  return NextResponse.json(cardList);
}
