import { Skeleton } from "@/components/ui";

const ClinicSectionSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-5 xl:gap-y-[30px] col-span-12 lg:col-span-7 2xl:col-span-8 border-none">
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row md:justify-center md:space-x-2.5 md:items-start">
          <div className="flex-1 flex items-center space-x-2.5">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <Skeleton className="h-5 w-64 mt-2" />
      </div>

      <Skeleton className="w-full h-96 2xl:h-[488px] rounded-md" />

      <div className="flex flex-col gap-y-3 w-full">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-5 w-full md:w-3/4" />
      </div>

      <div className="flex flex-col gap-y-5 w-full">
        <Skeleton className="h-8 w-36" />
        <div className="w-full grid grid-cols-1 xl:!grid-cols-2 gap-2.5">
          {[...Array(4)].map((_, idx) => (
            <Skeleton key={idx} className="h-16 w-full rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
};

export { ClinicSectionSkeleton };
