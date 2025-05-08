"use client";

import { cn } from "@/lib";
import { AnimatePresence, motion } from "framer-motion";

const Loader: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <AnimatePresence mode={"popLayout"}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className={cn(
          "size-5 animate-spin border-2 !border-t-transparent border-background rounded-full",
          className
        )}
      />
    </AnimatePresence>
  );
};

Loader.displayName = "Loader";
export { Loader };
