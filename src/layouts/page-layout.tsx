"use client";

import React from "react";
import { Toolbar } from "@/components/ui";
import { motion } from "framer-motion";

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <React.Fragment>
      <motion.section className="flex flex-col w-full h-full">
        <Toolbar />
        {children}
      </motion.section>
    </React.Fragment>
  );
};

export { PageLayout };
