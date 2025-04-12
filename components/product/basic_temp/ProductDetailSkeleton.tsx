"use client";

import React from "react";

export function ProductDetailSkeleton() {
  return (
    <div className="flex flex-col items-center p-4 space-y-4 animate-pulse">
      <div className="flex gap-4">
        <div className="w-20 h-10 bg-gray-200 rounded" />
        <div className="w-20 h-10 bg-gray-200 rounded" />
      </div>
      <div className="w-full max-w-3xl space-y-4">
        <div className="w-1/2 h-8 bg-gray-200 rounded" />
        <div className="w-full h-64 bg-gray-200 rounded" />
        <div className="w-3/4 h-6 bg-gray-200 rounded" />
        <div className="w-1/4 h-6 bg-gray-200 rounded" />
      </div>
      <div className="w-24 h-10 bg-gray-200 rounded" />
    </div>
  );
}