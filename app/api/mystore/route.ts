import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Simulate checking if user has store
    // In real application, you would check this from your database
    const hasStore = false;
    const storeId = "123"; // This would be fetched from database

    return NextResponse.json({ hasStore, storeId });
  } catch (error) {
    console.error("Error checking store:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 