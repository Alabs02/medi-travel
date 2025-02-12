import { MotionProps } from "framer-motion";
import { Store } from ".";

export type MotionButtonProps = MotionProps & {
  onClick?: any;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: "info" | "accent" | "success" | "destructive" | string;
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
};

export type ClinicCardProps = Store.Clinic & {
  href: string;
  className?: string;
};

export type Clinic = Omit<ClinicCardProps, "href" | "className">;
