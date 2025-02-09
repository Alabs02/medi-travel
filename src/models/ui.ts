import { MotionProps } from "framer-motion";

export type MotionButtonProps = MotionProps & {
  className?: string;
  children: React.ReactNode;
  variant?: "info" | "accent" | "success" | "destructive" | string,
  type?: "button" | "submit" | "reset";
};

export type MotionLinkProps = {
  href: string;
  label: string;
  className?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};

export type GradientTextProps = {
  text: string;
  gradient?: string;
  className?: string;
}