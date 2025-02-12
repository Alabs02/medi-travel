import { formatNumber } from "@/lib";
import React from "react";

const ProcedurePanel: React.FC<{ name: string; amount: number }> = ({
  name,
  amount
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2.5 w-full rounded-md bg-primary/5 px-5 py-7">
      <p className="flex-1 font-geist-sans text-base xl:text-lg text-primary/85 capitalize">
        {name}
      </p>
      <span className="bg-primary/10 font-outfit font-bold tracking-wide text-primary/85 px-2.5 py-[5px] rounded-full">
        {formatNumber(amount, { currency: "USD", decimals: 0 })}
      </span>
    </div>
  );
};

ProcedurePanel.displayName = "ProcedurePanel";
export { ProcedurePanel };
