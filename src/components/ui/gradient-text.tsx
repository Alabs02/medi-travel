import React from "react";
import { cn } from "@/lib";
import { UI } from "@/models";

const GradientText: React.FC<UI.GradientTextProps> = ({
  text,
  gradient,
  className
}) => {
  return (
    <span className={cn("inline-block leading-tight tracking-[-0.035em] bg-transparent", className)}>
      {text.split("").map((char, index) =>
        char === " " ? (
          <span key={index} className="inline-block">&nbsp;</span>
        ) : (
          <span
            key={index}
            className={cn(
              "font-plus-sans bg-clip-text text-transparent inline-block",
              gradient || "bg-gradient-to-b from-secondary/50 to-secondary"
            )}
          >
            {char}
          </span>
        )
      )}
    </span>
  );
};

GradientText.displayName = "GradientText";
const MemoizedGradientText = React.memo(GradientText);

export { MemoizedGradientText as GradientText };
