import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { format, parseISO, isValid } from "date-fns";
import startCase from "lodash/startCase";
import upperCase from "lodash/upperCase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isDevMode() {
  return process.env.NODE_ENV === "development";
}

export const formatValue = (value: any) => {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  return value ?? "N/A";
};

export const formatDate = (value: string | Date | null | undefined) => {
  if (!value) return "N/A";

  const date = typeof value === "string" ? parseISO(value) : value;

  return isValid(date) ? format(date, "dd/MM/yyyy") : "N/A";
};

export const formatCurrency = (
  amount: string | number | null | undefined
): string => {
  const numericAmount = Number(amount);

  return isNaN(numericAmount) || numericAmount === 0
    ? "N/A"
    : new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true
      }).format(numericAmount);
};

export const formatCurrencyWithSign = (
  amount: string | number | null | undefined,
  currency: string = "NGN"
): string => {
  const numericAmount = Number(amount);

  return isNaN(numericAmount) || numericAmount === 0
    ? "N/A"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(numericAmount);
};

export const render = (value: any, isDate = false) => {
  if (isDate) {
    return formatDate(value);
  } else return formatValue(value);
};

export const formatText = (text: string | null | undefined): string => {
  if (!text) return "N/A";

  return upperCase(startCase(text));
};

export const getSavingsCopy = (
  estimateCost: number,
  usAverageCost: number,
  format: "short" | "long" = "short"
): string => {
  const saving = usAverageCost - estimateCost;
  const percentage = Math.round((saving / usAverageCost) * 100);

  if (format === "long") {
    if (percentage >= 70) {
      return `Incredible savings! Experience top-tier healthcare at **${percentage}% less** than U.S. prices—without sacrificing quality or expertise.`;
    } else if (percentage >= 50) {
      return `Save **${percentage}%** on world-class treatments while receiving the same standard of care as in the U.S.`;
    } else if (percentage >= 30) {
      return `Affordable excellence! Get top-rated medical services at **${percentage}% lower** cost compared to the U.S.`;
    } else {
      return `Premium healthcare at a fraction of U.S. prices, without compromising on safety or quality.`;
    }
  }

  if (percentage >= 70) {
    return `Save **${percentage}%** on world-class care!`;
  } else if (percentage >= 50) {
    return `Get **${percentage}% off** U.S. prices.`;
  } else if (percentage >= 30) {
    return `Pay **${percentage}% less** for top care.`;
  } else {
    return `High-quality care, lower costs.`;
  }
};

export function formatTotalCount(count: number): string {
  return count.toLocaleString();
}

export function formatNumber(
  num: number,
  options: { currency?: string; compact?: boolean; decimals?: number } = {}
): string {
  if (isNaN(num)) return "0";

  const { currency, compact = false, decimals = 2 } = options;

  if (compact) {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: decimals
    }).format(num);
  }

  if (currency) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num);
  }

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
}

export const generateAvatarUrl = (
  name: string,
  size = 100,
  background = "random",
  color = "fff"
) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=${size}&background=${background}&color=${color}`;
};

export const getInitials = (name: string): string => {
  if (!name || typeof name !== "string") {
    return "";
  }

  const nameParts = name.trim().split(/\s+/);
  const firstInitial = nameParts[0] ? nameParts[0][0].toUpperCase() : "";
  const lastInitial =
    nameParts.length > 1
      ? nameParts[nameParts.length - 1][0].toUpperCase()
      : "";

  return `${firstInitial}${lastInitial}`;
};
