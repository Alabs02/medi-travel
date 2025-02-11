"use client";

import { cn } from "@/lib";
import React from "react";
import { motion } from "framer-motion";

const Loader: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <div
        className={cn(
          "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary",
          className
        )}
      />
    </motion.div>
  );
};

Loader.displayName = "Loader";
export { Loader };
