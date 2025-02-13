"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ImagePaths } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { Motion } from "./motion-button";
import { cn, getInitials } from "@/lib";
import { useLogout } from "@/hooks";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { IconLogout } from "@tabler/icons-react";
import { useAuthStore } from "@/store/auth";

const Toolbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const TitleTag = isHome ? "h1" : "span";
  const { getUser, getIsAuthenticated } = useAuthStore();
  const { mutateAsync } = useLogout();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownReady, setDropdownReady] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const avatarRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const onLogout = async () => {
    await mutateAsync();

    setTimeout(() => {
      setDropdownOpen(false);
    }, 200);

    if (!isHome) router.replace("/");
  };

  const toggleDropdown = () => {
    if (!avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + 8,
      left: rect.left - 60,
    });
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  useEffect(() => {
    setDropdownReady(true);

    return () => {
    setDropdownReady(false);
    }
  }, []);

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
            href={""}
            label="Health Insights"
          />
          <Motion.Link
            className="hidden lg:inline-flex"
            href={""}
            label="Our Mission"
          />
          <Motion.Button type="button">
            <span className="text-cta text-normal text-pretty">
              Book a Consultation
            </span>
          </Motion.Button>

          {getIsAuthenticated() && (
            <motion.button
              key="user-avatar"
              type="button"
              ref={avatarRef}
              onClick={toggleDropdown}
              initial={{ opacity: 0, y: -6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="size-10 relative border-none rounded-full grid place-items-center bg-accent/20 !text-accent font-outfit font-semibold overflow-hidden shadow-[0_0_0_1px] shadow-accent/25 focus-visible:outline-none"
            >
              <p>{getInitials(getUser()?.displayName || "")}</p>
            </motion.button>
          )}
        </div>
      </div>

      {dropdownOpen && dropdownReady &&
        createPortal(
          <div
            ref={dropdownRef}
            className="absolute z-[9999] w-52 bg-white shadow-lg rounded-lg overflow-hidden"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              position: "fixed",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="py-2"
            >
              <button
                onClick={onLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <IconLogout className="mr-2" />
                Log Out
              </button>
            </motion.div>
          </div>,
          document.body
        )}
    </nav>
  );
};

export { Toolbar };
