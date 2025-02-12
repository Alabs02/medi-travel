import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & { errors?: boolean }
>(({ className, errors = false, ...props }, ref) => {
  const radius = 100;
  const [visible, setVisible] = React.useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      style={{
        background: errors
          ? useMotionTemplate`
      radial-gradient(
        ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
        hsl(var(--destructive)),
        transparent 80%
      )
    `
          : useMotionTemplate`
    radial-gradient(
      ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
      hsl(var(--accent)),
      transparent 80%
    )
  `
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="p-0.5 rounded-md transition duration-300 group/textarea"
    >
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-transparent hover:border-accent/20 focus:border-accent/15 px-3 py-2 text-base shadow-sm disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-secondary/75 placeholder:text-secondary/60 bg-muted hover:bg-background focus:bg-background focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-1 focus-visible:ring-offset-background focus-visible:outline-none focus-visible:outline-0 transition-all duration-400",
          errors && "hover:border-destructive/20 focus:border-destructive/15 focus-visible:ring-destructive/50",
          className
        )}
        ref={ref}
        {...props}
      />
    </motion.div>
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
