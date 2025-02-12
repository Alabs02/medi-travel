"use client";

import React from "react";
import { cn } from "@/lib";
import Image from "next/image";
import { motion } from "framer-motion";
import { ImagePaths } from "@/constants";
import { Motion } from "./motion-button";
import { Hospital } from "lucide-react";

const EmptyState: React.FC<{ className?: string; onClick?: any }> = ({
  className,
  onClick
}) => {
  return (
    <motion.div
      key="empty-state"
      initial={{ opacity: 0, y: -6, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={cn("flex flex-col items-center w-full", className)}
    >
      <div className="relative size-16 md:size-24 xl:size-32 overflow-hidden grid place-items-center">
        <Image
          priority
          src={ImagePaths.EMPTY_STATE}
          width={150}
          height={170}
          quality={100}
          alt={""}
          draggable={false}
          className="size-full object-contain"
        />
      </div>

      <p className="text-sm md:text-base xl:text-lg text-secondary/75 mt-5 xl:mt-[30px]">
        No clinics available, check back soon or add a clinic to get started.
      </p>

      <Motion.OutlinedButton
        className="h-10 mt-5"
        type="button"
        onClick={onClick}
      >
        <Hospital size={20} />
        <span className="font-outfit text-sm">Add a New Clinic</span>
      </Motion.OutlinedButton>
    </motion.div>
  );
};

EmptyState.displayName = "EmptyState";
export { EmptyState };
