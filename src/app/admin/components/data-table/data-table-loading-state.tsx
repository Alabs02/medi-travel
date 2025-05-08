"use client";

import React, { FC } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib";
import { ImagePaths } from "@/constants";

const DataTableLoadingState: FC<{ message?: string; className?: string }> = ({
  className,
  message
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={"loading-state"}
        initial={{ opacity: 0, y: -6, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "flex flex-col h-80 gap-y-5 items-center justify-center w-full rounded shadow-[0_0_0_1px] shadow-border transition-all duration-200 will-change-auto",
          className
        )}
      >
        <div className="size-14 lg:size-16 relative overflow-hidden border-none rounded-full animate-spin">
          <Image
            src={ImagePaths.LOADER}
            alt={""}
            fill
            priority
            quality={100}
            draggable={false}
            className="size-full object-scale-down"
          />
        </div>

        <p className="text-center text-base text-secondary/90 lg:max-w-[70%] 2xl:max-w-[55%]">
          {message || `Processing securely… Because every detail matters.`}
        </p>
      </motion.section>
    </AnimatePresence>
  );
};

export { DataTableLoadingState };
