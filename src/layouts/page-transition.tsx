"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, x: 60, scale: 0.98 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 20 }
  },
  exit: {
    opacity: 0,
    x: -60,
    scale: 0.98,
    transition: { duration: 0.4, ease: "easeInOut" }
  }
};

const PageTransition: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

PageTransition.displayName = "PageTransition";
export { PageTransition };
