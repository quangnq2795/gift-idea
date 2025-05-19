import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const storeName = formData.get("storeName") as string;
    const avatar = formData.get("avatar") as File;
    const background = formData.get("background") as File;
    const userId = formData.get("userId") as string;

    if (!storeName || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Upload the images to a storage service
    // 2. Save the store data to your database
    // 3. Return the created store data

    // For now, we'll simulate a successful creation
    const storeId = userId; // Using userId as storeId for demonstration
    
    return NextResponse.json({
      success: true,
      storeId,
      storeName,
      avatar: avatar ? URL.createObjectURL(avatar) : null,
      background: background ? URL.createObjectURL(background) : null,
    });
  } catch (error) {
    console.error("Error creating store:", error);
    return NextResponse.json(
      { error: "Failed to create store" },
      { status: 500 }
    );
  }
} 