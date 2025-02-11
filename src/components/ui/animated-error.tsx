"use client";

import { ErrorMessage } from "formik";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedError: React.FC<{ name: string }> = ({ name }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`field-error-${name}`}
        initial={{ opacity: 0, y: -6, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.95 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <ErrorMessage
          name={name}
          component="small"
          className="font-geist-sans text-[13px] text-destructive text-pretty antialiased transition-all ml-1 animate-in fade-in-95 duration-300"
        />
      </motion.div>
    </AnimatePresence>
  );
};

AnimatedError.displayName = "AnimatedError";
export { AnimatedError };