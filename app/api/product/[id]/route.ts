import { NextResponse } from 'next/server';
import { use } from "react";

export async function GET() {
  try {
    const product = {
      id: 1,
      name: "Product A",
      description: "Description of Product A",
      price: 100,
      images: [
        { id: 1, url: "https://i.pinimg.com/736x/c5/ad/7e/c5ad7e615fda9d44c186a7e4896610db.jpg", alt: "Image 1" },
        { id: 2, url: "https://i.pinimg.com/736x/cc/45/76/cc4576c4c29de6eb451ad73a36f1f5f6.jpg", alt: "Image 2" },
        { id: 3, url: "https://i.pinimg.com/736x/99/08/50/9908502f2a0101a31fcb236c3b532acf.jpg", alt: "Image 3" },
      ],
      video: "https://youtu.be/ODPZl45OxgU",
    };

    return NextResponse.json(product);
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
