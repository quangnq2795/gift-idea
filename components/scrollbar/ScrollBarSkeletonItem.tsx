import {Skeleton} from "@heroui/react";

export const ScrollBarSkeletonItem = () => {
  return (
    <div className="max-h-[400px]">
      <Skeleton className="w-[200px] rounded-lg" />
    </div>
  );
};