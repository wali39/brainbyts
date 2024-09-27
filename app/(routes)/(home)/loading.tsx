"use client";

import Skeleton from "@/components/skeleton";

export default function Loading() {
  return (
    <div className="max-w-5xl mt-16">
      <div className="h-full w-full">
        <div className="grid grid-cols-12 mb-10">
          <Skeleton className="aspect-[16/2] rounded-xl col-span-10 col-start-2 md:col-span-8 md:col-start-3 " />
        </div>
        <div className="space-y-10">
          <div className="grid grid-cols-2 gap-10">
            <Skeleton className="aspect-[16/6] rounded-xl " />
            <Skeleton className="aspect-[16/6] rounded-xl " />
          </div>
          <div className="grid grid-cols-2 gap-10">
            <Skeleton className="aspect-[16/6] rounded-xl " />
            <Skeleton className="aspect-[16/6] rounded-xl " />
          </div>
        </div>
      </div>
    </div>
  );
}
