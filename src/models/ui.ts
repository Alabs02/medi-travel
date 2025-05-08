import { MotionProps } from "framer-motion";
import { Server, Store } from ".";
import { Column, Row, Table } from "@tanstack/react-table";

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

export type DataTableHeaderProps<TData, TValue> =
  React.HTMLAttributes<HTMLDivElement> & {
    column: Column<TData, TValue>;
    title: string;
  };

export type DataTableControlProps<TData> = {
  table: Table<TData>;
};

export type DataTableSpanProps = {
  value: string | number | null | undefined;
  className?: string;
  presentation?: "text" | "badge";
  type?: "date" | "amount" | "amount-with-sign" | "text";
  varaint?:
    | "secondary"
    | "destructive"
    | "warn"
    | "success"
    | "info"
    | "accent";
};

export interface EditUserDialogProps {
  open: boolean;
  loading: boolean;
  onOpenChange: (value: boolean) => void;
  row: Row<Server.IUser>;
  onSubmitEdit: (values: { name: string; roleId: string }) => Promise<void>;
}
