import { NextResponse } from 'next/server';

const suggestList = [
    "banh trung thu",
    "qua tet",
    "hoa tuoi",
    "qua sinh nhat"
];

// Handle GET requests
export async function GET() {
  return NextResponse.json(suggestList);
}
