"use client";

import * as React from "react";
import { UI } from "@/models";
import { cn } from "@/lib/utils";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { whileTapOptions } from "@/constants";
import { usePathname } from "next/navigation";

const MotionLink = motion.create(NextLink);

const Button = React.forwardRef<HTMLButtonElement, UI.MotionButtonProps>(
  (
    { className, variant = "accent", children, disabled, onClick, ...rest },
    ref
  ) => (
    <motion.button
      ref={ref}
      {...whileTapOptions}
      {...rest}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "group/btn relative overflow-hidden rounded-md bg-primary hover:brightness-110 py-2.5 px-5 text-primary-foreground font-medium transition-colors duration-300",
        className
      )}
    >
      <motion.div className="flex items-center gap-2 md:gap-2.5">
        {children}
      </motion.div>

      <motion.div
        className={cn(
          "absolute left-0 bottom-0 h-1 w-full bg-gradient-to-r from-transparent to-transparent transform-gpu origin-center blur-sm brightness-125 opacity-0 group-hover/btn:opacity-100 scale-x-0 group-hover/btn:scale-x-100 transition-all duration-300 ease-in-out",
          {
            "via-info": variant === "info",
            "via-accent": variant === "accent",
            "via-success": variant === "success",
            "via-destructive": variant === "destructive"
          }
        )}
      />
    </motion.button>
  )
);

const OutlinedButton = React.forwardRef<
  HTMLButtonElement,
  UI.MotionButtonProps
>(
  (
    { className, variant = "accent", children, disabled, onClick, ...rest },
    ref
  ) => (
    <motion.button
      ref={ref}
      {...whileTapOptions}
      {...rest}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group/btn relative overflow-hidden rounded-md bg-transparent border-none !shadow-[0_0_0_1px] !shadow-hairline/25 hover:!shadow-accent/50 hover:brightness-110 py-2.5 px-5 font-medium text-primary/85 hover:text-accent transition-colors duration-300",
        className
      )}
    >
      <motion.div className="flex items-center gap-2 md:gap-2.5 w-full">
        {children}
      </motion.div>

      <motion.div
        className={cn(
          "absolute left-0 bottom-0 h-[3px] w-full bg-gradient-to-r from-transparent to-transparent transform-gpu origin-center blur-sm brightness-125 opacity-0 group-hover/btn:opacity-100 scale-x-0 group-hover/btn:scale-x-100 transition-all duration-300 ease-in-out",
          {
            "via-info": variant === "info",
            "via-accent": variant === "accent",
            "via-success": variant === "success",
            "via-destructive": variant === "destructive"
          }
        )}
      />
    </motion.button>
  )
);

const GhostButton = React.forwardRef<HTMLButtonElement, UI.MotionButtonProps>(
  (
    { className, variant = "accent", children, disabled, onClick, ...rest },
    ref
  ) => (
    <motion.button
      ref={ref}
      {...whileTapOptions}
      {...rest}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group/btn relative overflow-hidden rounded-md bg-transparent border-none hover:bg-muted py-2.5 px-5 font-medium text-primary/75 hover:text-primary/85 transition-colors duration-300",
        className
      )}
    >
      <motion.div className="flex items-center gap-2 md:gap-2.5">
        {children}
      </motion.div>
    </motion.button>
  )
);

const Link = React.forwardRef<
  HTMLAnchorElement,
  UI.MotionLinkProps & { size?: "lg" | "base" | "sm" | "xs" }
>(({ href, label, className, size = "base", prefix, suffix }, ref) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const sizeClassName = () => {
    switch (size) {
      case "lg":
        return "!text-lg";
      case "base":
        return "!text-base";
      case "sm":
        return "!text-sm";
      case "xs":
        return "!text-xs";
      default:
        return "!text-base";
    }
  };

  return (
    <MotionLink
      passHref
      ref={ref}
      href={href}
      aria-label={label}
      data-label={label}
      className={cn(
        `group/link relative inline-flex items-center justify-center text-primary/75 text-pretty text-sm md:${sizeClassName()} font-outfit font-medium capitalize tracking-wide no-underline overflow-hidden`,
        isActive
          ? "!text-accent"
          : `before:content-[attr(data-label)] before:absolute before:!text-accent before:-ml-[0.8px] before:font-outfit before:md:${sizeClassName()} before:${sizeClassName()} before:tracking-wide before:font-medium before:top-0 before:left-0 before:translate-y-[140%] hover:before:translate-y-0 transform-gpu`,
        className
      )}
    >
      {prefix}
      <span
        className={cn(
          "font-outfit !text-primary/75 text-pretty block",
          isActive
            ? "!text-accent"
            : "group-hover/link:-translate-y-[140%] transform-gpu"
        )}
      >
        {label}
      </span>
      {suffix}
    </MotionLink>
  );
});

const Motion = {
  Link,
  Button,
  GhostButton,
  OutlinedButton
};

Link.displayName = "Motion.Link";
Button.displayName = "Motion.Button";
OutlinedButton.displayName = "Motion.OutlinedButton";

export { Motion };
