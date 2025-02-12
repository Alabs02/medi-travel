"use client";

import React from "react";
import { Toolbar, Footer } from "@/components/ui";
import { motion } from "framer-motion";

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.section className="min-h-screen w-full grid grid-cols-1">
      <div className="flex flex-col w-full h-full">
        <Toolbar />
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
        <Footer />
      </div>
    </motion.section>
  );
};

export { PageLayout };
