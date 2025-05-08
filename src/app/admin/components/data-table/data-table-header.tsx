"use client";

import { cn } from "@/lib";
import { Button } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui";
import { UI } from "@/models";

import { ChevronsUpDown, EyeOff } from "lucide-react";

const DataTableHeader = <TData, TValue>({
  title,
  column,
  className
}: UI.DataTableHeaderProps<TData, TValue>) => {
  if (!column.getCanSort()) {
    return <div className={cn("font-geist", className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 px-2.5 h-8 data-[state=open]:bg-primary/15"
          >
            <span className="font-geist">{title}</span>

            <ChevronsUpDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export { DataTableHeader };
