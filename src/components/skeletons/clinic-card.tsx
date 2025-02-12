"use client";
import { Skeleton } from "@/components/ui";

const ClinicCardSkeleton: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-y-2.5">
      <div className="w-full h-52 grid grid-cols-1 rounded-md relative overflow-hidden">
        <Skeleton className="w-full h-full rounded-md" />
        <div className="flex items-start justify-between w-full absolute top-0 p-2.5 rounded-md z-10">
          <Skeleton className="w-28 h-6 rounded-full" />
          <Skeleton className="w-6 h-6 rounded-full" />
        </div>
      </div>

      <div className="flex items-center justify-between space-x-2.5">
        <Skeleton className="flex-1 h-6 rounded-md max-w-[85%]" />
        <Skeleton className="w-12 h-6 rounded-md" />
      </div>

      <div className="flex items-center space-x-2.5">
        <Skeleton className="w-24 h-6 rounded-md" />
        <Skeleton className="w-16 h-6 rounded-md" />
      </div>

      <Skeleton className="w-32 h-6 rounded-md" />

      <div className="flex items-center gap-5 w-full mt-2.5">
        <Skeleton className="flex-1 h-10 rounded-md" />
        <Skeleton className="flex-1 h-10 rounded-md" />
      </div>
    </div>
  );
};

export { ClinicCardSkeleton };
