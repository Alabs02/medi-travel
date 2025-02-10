"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { ImagePaths } from '@/constants';
import { usePathname } from 'next/navigation';
import { Motion } from './motion-button';
import { cn } from '@/lib';

const Toolbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const TitleTag = isHome ? "h1" : "span";

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn("w-full h-20 flex justify-center shadow-[0_1px_0_0] bg-gradient-to-b from-background/50 via-background/25 to-background/5 backdrop-filter sticky top-0 z-30 transition-all duration-300",
        scrolled ? "via-background/50 to-transparent shadow-hairline/5 backdrop-blur-sm" : "shadow-hairline/0 backdrop-blur-none"
      )}
    >
      <div className="container h-full flex items-center justify-between">
          <Link href={"/"} className="flex space-x-2.5 items-center" passHref>
            <div className="size-12 relative overflow-hidden">
              <Image
                src={ImagePaths.BRAND_LOGO}
                alt={"MediTravel"}
                width={104}
                height={116}
                quality={100}
                draggable={false}
                priority
                className="size-full object-contain"
              />
            </div>

            <TitleTag className="font-plus-sans font-bold text-xl tracking-[0.015em] hidden lg:inline-block">MediTravel</TitleTag>
          </Link>

          <div className="flex space-x-2.5 lg:space-x-5 items-center">
            <Motion.Link className='hidden lg:inline-flex' href={"/"} label='Explore Clinics' />
            <Motion.Link className='hidden lg:inline-flex' href={"/health-insights"} label='Health Insights' />
            <Motion.Link className='hidden lg:inline-flex' href={"/our-mission"} label='Our Mission' />
            <Motion.Button
              type="button"
            >
              <span className="text-cta text-normal text-pretty">Book a Consultation</span>
            </Motion.Button>
          </div>
      </div>
    </nav>
  );
}

export { Toolbar };