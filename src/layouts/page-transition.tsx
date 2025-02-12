"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { nanoid } from "nanoid";

const pageVariants = {
  initial: { opacity: 0, x: 30, scale: 0.98 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 180, damping: 20, delay: 0.03 }
  },
  exit: {
    opacity: 0,
    x: -30,
    scale: 0.98,
    transition: { duration: 0.25, ease: "easeInOut" }
  }
};

const PageTransition: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [pathKey, setPathKey] = useState(nanoid(10));
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!pathname) return;

    setIsTransitioning(true);
    const timeout = setTimeout(() => {
      setPathKey(nanoid(10));
      setDisplayChildren(children);
      setIsTransitioning(false);
    }, 150);

    return () => clearTimeout(timeout);
  }, [pathname, children]);

  return (
    <AnimatePresence mode="wait">
      {!isTransitioning && (
        <motion.div
          key={pathKey}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full h-full"
        >
          {displayChildren}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

PageTransition.displayName = "PageTransition";
export { PageTransition };
