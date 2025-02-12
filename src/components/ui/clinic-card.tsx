"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn, formatNumber, getSavingsCopy } from "@/lib";
import { UI } from "@/models";
import ReactMarkdown from "react-markdown";
import { IconHeart, IconStar } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "./tooltip";
import { Motion } from "./motion-button";
import { BadgeDollarSign } from "lucide-react";

const MotionLink = motion.create(Link);

const ClinicCard: React.FC<UI.ClinicCardProps> = (props) => {
  const {
    src,
    name,
    location,
    saving,
    rating,
    tagline,
    estimateCost,
    usAverageCost,
    href,
    className
  } = props;

  return (
    <MotionLink
      href={href}
      aria-label={name}
      title={name}
      className={cn("w-full flex flex-col gap-y-2.5", className)}
    >
      <div className="w-full h-52 grid grid-cols-1 rounded-md relative overflow-hidden">
        <Image
          priority
          src={src}
          alt={name}
          width={500}
          height={500}
          quality={100}
          draggable={false}
          className="size-full object-cover object-center"
        />
        <div className="flex items-start justify-between w-full absolute top-0 p-2.5 rounded-md z-10">
          <p className="cursor-default flex items-center bg-accent-foreground/85 backdrop-filter font-outfit capitalize tracking-wide font-medium text-primary/75 px-2.5 py-0.5 rounded-full text-[15px]">
            <BadgeDollarSign size={18} className="mr-1" />
            {`Est. Cost: ${formatNumber(estimateCost, { currency: "USD", decimals: 0 })}`}
          </p>

          <IconHeart
            className="cursor-pointer text-accent-foreground/85 backdrop-filter fill-primary/50 hover:scale-110 transition-all duration-300 transform-gpu"
            size={22}
          />
        </div>
      </div>

      <div className="flex items-center justify-between space-x-2.5">
        <h6 className="flex-1 font-plus-sans font-semibold text-secondary/85 text-[15px] max-w-[85%] text-ellipsis truncate">
          {name}
        </h6>
        <div className="flex items-center space-x-1">
          <IconStar
            size={18}
            className={cn(
              "text-accent/50 transition-all duration-300",
              rating > 0 ? "fill-accent" : "hidden"
            )}
          />
          <span
            className={cn(
              "font-outfit text-secondary/85 text-[15px] transition-all duration-300",
              rating === 0 &&
                "text-accent bg-accent/20 rounded px-2 text-center"
            )}
          >
            {rating > 0 ? rating : "New"}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2.5">
        <ReactMarkdown
          className={"!font-geist-sans text-[15px] text-secondary/75"}
        >
          {getSavingsCopy(estimateCost, usAverageCost)}
        </ReactMarkdown>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <motion.div className="text-xs text-secondary/75 uppercase font-outfit font-medium tracking-wider px-2.5 py-1 rounded-full bg-muted">
                <span>
                  Save{" "}
                  {formatNumber(saving, {
                    compact: true,
                    currency: "USD"
                  })}
                </span>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <span className="!text-background font-outfit text-sm">{`You'll Save ${formatNumber(saving, { currency: "USD", decimals: 0 })}`}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex items-center">
        <p className="font-geist-sans text-[15px] text-secondary/75">
          {location}
        </p>
      </div>

      <div className="flex items-center gap-5 w-full mt-2.5">
        <Motion.OutlinedButton className="flex-1 !justify-center !px-1">
          <span className="font-outfit flex-1 text-center text-sm font-normal tracking-[0.01em]">
            View Details
          </span>
        </Motion.OutlinedButton>

        <Motion.Button className="flex-1 !justify-center !px-1">
          <span className="font-outfit flex-1 text-center text-sm font-normal tracking-[0.01em]">
            Check Availability
          </span>
        </Motion.Button>
      </div>
    </MotionLink>
  );
};

ClinicCard.displayName = "ClinicCard";
export { ClinicCard };
