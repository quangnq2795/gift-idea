import { NextResponse } from "next/server";

export async function GET() {
  // This is example data - you can replace with your actual categories from database
  const categories = [
    { id: 1, name: "Thời trang" },
    { id: 2, name: "Điện tử" },
    { id: 3, name: "Đồ gia dụng" },
    { id: 4, name: "Mỹ phẩm" },
    { id: 5, name: "Thực phẩm" },
    { id: 6, name: "Sách" },
    { id: 7, name: "Đồ chơi" },
    { id: 8, name: "Thể thao" },
    { id: 9, name: "Nội thất" },
    { id: 10, name: "Trang sức" }
  ];

  return NextResponse.json({ categories });
} 