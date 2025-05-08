"use client";

import React from "react";

import { motion } from "framer-motion";
import { IconBell } from "@tabler/icons-react";
import { whileTapOptions } from "@/constants";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/auth";
import { getInitials } from "@/lib";

const TopNav = () => {
  const { getProfile, getUser } = useAuthStore();

  return (
    <>
      <nav className="sticky w-full flex items-center justify-between z-20 p-5 top-0 bg-background/35 backdrop-blur-sm">
        <SidebarTrigger className="rounded-md" />

        <div className="flex items-center gap-2.5">
          <motion.button
            {...whileTapOptions}
            type="button"
            className="size-9 grid place-items-center rounded-md bg-muted/50 hover:bg-accent/15 text-foreground hover:text-accent transition-colors duration-300"
          >
            <IconBell />
          </motion.button>

          <Avatar>
            <AvatarImage src={getUser()?.photoURL || ""} alt="@shadcn" />
            <AvatarFallback className="bg-accent/15 text-accent">
              {getInitials(
                getProfile()?.name || getUser()?.displayName || "Admin"
              )}
            </AvatarFallback>
          </Avatar>
        </div>
      </nav>
    </>
  );
};

export { TopNav };
