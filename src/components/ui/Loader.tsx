"use client";

import { cn } from "@/lib";
import React from "react";
import { motion } from "framer-motion";

const Loader: React.FC<{
  className?: string;
  type?: "relative" | "absolute";
}> = ({ className, type = "relative" }) => {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={
        type === "absolute"
          ? {
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }
          : { position: "relative" }
      }
    >
      <div
        className={cn(
          "animate-spin rounded-full border-t-2 border-b-2",
          type === "relative"
            ? "size-6 border-primary-foreground"
            : "size-12 border-primary",
          className
        )}
      />
    </motion.div>
  );
};

Loader.displayName = "Loader";
export { Loader };
