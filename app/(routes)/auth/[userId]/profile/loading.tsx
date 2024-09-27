"use client";

import Skeleton from "@/components/skeleton";

export default function Loading() {
  return (
    <div className="max-w-5xl mt-28">
      <div className="h-full w-full">
        {/* <div className="grid grid-cols-12 mb-10">
          <Skeleton className="aspect-[16/2] rounded-xl col-span-10 col-start-2 md:col-span-8 md:col-start-3 " />
        </div> */}
        <div className="flex justify-center items-center mb-12">
          <div
            className="text-2xl font-medium text-[#200a0a] text-center inline-block 
        relative p-1 border-b-accent rounded-md bg-cardBg px-14 py-4 "
          >
            <span className="w-10 h-1 bg-cardBg absolute top-[50%] -right-10 rounded-md " />
            <span className="w-10 h-1 bg-cardBg absolute top-[50%] -left-10 rounded-md  " />
          </div>
        </div>
        <div className="space-y-10">
          <div className="grid grid-cols-2 gap-10">
            <Skeleton className="aspect-[16/3] rounded-xl " />
            <Skeleton className="aspect-[16/3] rounded-xl " />
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
