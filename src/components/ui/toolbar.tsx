"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ImagePaths } from "@/constants";
import { usePathname } from "next/navigation";
import { Motion } from "./motion-button";
import { cn, getInitials } from "@/lib";
import { useCheckAuth, useLogout } from "@/hooks";
import { motion } from "framer-motion";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

const Toolbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const TitleTag = isHome ? "h1" : "span";
  const { getUser, getIsAuthenticated, isAuthenticated } = useAuthStore();

  const { mutateAsync } = useLogout();

  const [scrolled, setScrolled] = useState(false);

  const onLogout = async () => {
    await mutateAsync();
    if (!isHome) router.replace("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAuthenticated]);

  return (
    <nav
      className={cn(
        "w-full h-20 flex justify-center shadow-[0_1px_0_0] bg-gradient-to-b from-background/50 via-background/25 to-background/5 backdrop-filter sticky top-0 z-30 transition-all duration-300",
        scrolled
          ? "via-background/50 to-transparent shadow-hairline/5 backdrop-blur-sm"
          : "shadow-hairline/0 backdrop-blur-none"
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

          <TitleTag className="font-plus-sans font-bold text-xl tracking-[0.015em] hidden lg:inline-block">
            MediTravel
          </TitleTag>
        </Link>

        <div className="flex space-x-2.5 lg:space-x-5 items-center">
          <Motion.Link
            className="hidden lg:inline-flex"
            href={"/"}
            label="Explore Clinics"
          />
          <Motion.Link
            className="hidden lg:inline-flex"
            href={"/health-insights"}
            label="Health Insights"
          />
          <Motion.Link
            className="hidden lg:inline-flex"
            href={"/our-mission"}
            label="Our Mission"
          />
          <Motion.Button type="button">
            <span className="text-cta text-normal text-pretty">
              Book a Consultation
            </span>
          </Motion.Button>

          {getIsAuthenticated() ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  key="user-avatar"
                  type="button"
                  initial={{ opacity: 0, y: -6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="size-10 relative border-none rounded-full grid place-items-center bg-accent/20 !text-accent font-outfit font-semibold overflow-hidden shadow-[0_0_0_1px] shadow-accent/25 focus-visible:outline-none"
                >
                  <p>{getInitials(getUser()?.displayName || "")}</p>
                </motion.button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-52 bg-white shadow-[0_0_0_1px] shadow-primary/10 -translate-x-5">
                <DropdownMenuItem
                  onClick={onLogout}
                  className="cursor-pointer hover:bg-muted text-secondary/85"
                >
                  <IconLogout />
                  <span className="font-outfit">Log Out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export { Toolbar };
