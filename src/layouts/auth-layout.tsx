"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ImagePaths } from "@/constants";
import { GradientText, Motion } from "@/components/ui";
import { usePathname } from "next/navigation";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  const isLogin = pathname === "/auth/login";

  console.log({ pathname });

  return (
    <React.Fragment>
      <motion.main className="grid place-items-center w-full min-h-screen relative py-10 px-5 lg:!p-0">
        <motion.section className="flex flex-col items-center min-h-96 max-h-[70vh] overflow-y-auto overflow-x-hidden w-full lg:w-[425px] p-5 lg:p-[30px] overflow-hidden rounded-lg bg-background relative !z-20 border-none shadow-[0_0_0_1px] shadow-primary/15">
          <Link href={"/"} passHref>
            <div className="size-14 px-1 relative overflow-hidden border-none shadow-none mb-2.5">
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
          </Link>

          <h1 aria-label="Welcome to Aceternity">
            <GradientText
              text={isLogin ? "Welcome to Aceternity" : "Join MediTravel Today"}
              className="font-plus-sans font-extrabold text-lg md:text-xl text-pretty text-center whitespace-nowrap"
            />
          </h1>

          <p className="font-geist-sans text-sm text-secondary/75 mt-0.5 transition-all duration-300">
            {isLogin
              ? "Log in to access world-class healthcare options."
              : "Discover top-rated clinics and save on medical procedures."}
          </p>

          <motion.div className="w-full grid mt-[30px]">{children}</motion.div>

          <div className="flex items-center space-x-2.5 mt-5">
            <span className="font-geist-sans font-medium text-sm text-secondary/75">
              {isLogin ? "Don't have an account?" : "Already a member?"}
            </span>
            <Motion.Link
              size={"sm"}
              href={isLogin ? "/auth/register" : "/auth/login"}
              label={isLogin ? "Sign Up" : "Log In"}
            />
          </div>
        </motion.section>

        <Dots />
      </motion.main>
    </React.Fragment>
  );
};

function Dots() {
  return (
    <div className="absolute top-0 h-screen left-0 w-full bg-background bg-dot-black/[0.2] grid grid-cols-1 z-0">
      <div className="relative w-full h-full flex place-items-center bg-transparent">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
    </div>
  );
}

AuthLayout.displayName = "AuthLayout";
export { AuthLayout };
