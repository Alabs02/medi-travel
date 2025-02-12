import type { ReactNode } from "react";
import Image from "next/image";
import { ImagePaths } from "@/constants";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid place-items-center w-full min-h-screen relative py-10 px-5 lg:!p-0 transition-all duration-300">
      <div className="grid place-items-center min-h-96 md:w-[500px] xl:w-[425px] max-w- max-h-[90vh] 2xl:max-h-[70vh] !overflow-y-auto overflow-x-hidden w-full p-5 xl:p-[30px] overflow-hidden rounded-lg bg-background relative !z-20 border-none shadow-[0_0_0_1px] shadow-primary/15">
        <div className="!size-14 px-1 relative overflow-hidden shadow-none mb-2.5 border-none">
          <Image
            src={ImagePaths.BRAND_LOGO}
            alt="MediTravel"
            width={104}
            height={116}
            quality={100}
            draggable={false}
            priority
            className="size-full object-contain"
          />
        </div>

        {children}
      </div>

      <Dots />
    </div>
  );
}

function Dots() {
  return (
    <div className="absolute top-0 h-screen left-0 w-full bg-background bg-dot-black/[0.2] grid grid-cols-1 z-0">
      <div className="relative w-full h-full flex place-items-center bg-transparent">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
    </div>
  );
}
