"use client";

import React from "react";
import { UI } from "@/models";
import { cn, formatCurrency, formatCurrencyWithSign, render } from "@/lib";
import { toLower, toString } from "@/_";

const Badge: React.FC<{
  children?: React.ReactNode;
  className?: string;
  variant?: any;
}> = ({ children, className, variant }) => {
  const getBg = () => {
    switch (toLower(toString(variant))) {
      case "success":
        return "bg-success/15";
      case "destructive":
        return "bg-destructive/15";
      case "info":
        return "bg-info/15";
      case "secondary":
        return "bg-secondary/15";
      default:
        return "bg-accent/15";
    }
  };

  const getDotBg = () => {
    switch (toLower(toString(variant))) {
      case "success":
        return "bg-success";
      case "destructive":
        return "bg-destructive";
      case "info":
        return "bg-info";
      case "secondary":
        return "bg-secondary";
      default:
        return "bg-accent";
    }
  };

  const getColor = () => {
    switch (toLower(toString(variant))) {
      case "success":
        return "text-success";
      case "destructive":
        return "text-destructive";
      case "info":
        return "text-info";
      case "secondary":
        return "text-secondary";
      default:
        return "text-accent";
    }
  };

  return (
    <div
      className={cn("inline-block py-1 px-2.5 rounded", getBg(), getColor())}
    >
      <div className="flex items-center gap-1.5">
        <span
          className={cn(
            "inline-block size-2 rounded-full align-middle",
            getDotBg()
          )}
        ></span>
        {children}
      </div>
    </div>
  );
};

const DataTableSpan: React.FC<UI.DataTableSpanProps> = ({
  value,
  className,
  type = "text",
  varaint = "accent",
  presentation = "text"
}) => {
  const formattedValue =
    type === "amount"
      ? formatCurrency(value)
      : type === "amount-with-sign"
        ? formatCurrencyWithSign(value)
        : type === "date"
          ? render(value, true)
          : render(value);

  return (
    <>
      {presentation === "badge" ? (
        <Badge variant={varaint}>
          <span className="uppercase text-xs tracking-wide font-medium font-outfit">
            {value}
          </span>
        </Badge>
      ) : (
        <span
          className={cn(
            "!text-sm !text-pretty text-left px-2.5",
            type === "amount" || (type === "amount-with-sign" && "!text-right"),
            className
          )}
        >
          {formattedValue}
        </span>
      )}
    </>
  );
};

export { DataTableSpan };
