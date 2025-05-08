"use client";

import React, { FC } from "react";
import { cn } from "@/lib";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ImagePaths } from "@/constants";

const DataTableEmptyState: FC<{ message?: string; className?: string }> = ({
  message,
  className
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={"empty-state"}
        initial={{ opacity: 0, y: -6, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "flex flex-col h-80 gap-y-5 items-center justify-center w-full rounded shadow-[0_0_0_1px] shadow-border transition-all duration-200 will-change-auto",
          className
        )}
      >
        <div className="relative h-44 w-36">
          <Image
            src={ImagePaths.EMPTY_STATE}
            alt={"Empty State Illustration"}
            width={143}
            height={188}
            quality={100}
            draggable={false}
            priority
            className="object-center object-scale-down"
          />
        </div>

        <p className="text-[15px] leading-6 text-center text-primary/50 max-w-[70%]">
          {message ||
            "No records available. Once data is available, it’ll appear here, organized and ready for review."}
        </p>
      </motion.section>
    </AnimatePresence>
  );
};

export { DataTableEmptyState };
