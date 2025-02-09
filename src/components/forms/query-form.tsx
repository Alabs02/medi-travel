import React from "react";

import { cn } from "@/lib";
import { useMediaQuery } from "@/hooks";
import { Button } from "@/components/ui/button";

import {
  Input,
  Label,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DialogFooter,
  Motion,
  ScrollArea,
  Separator
} from "@/components/ui";
import { useQueryStore } from "@/store/query";
import { IconFilter } from "@tabler/icons-react";

export type QueryFormDialogprops = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const QueryFormDialog: React.FC<QueryFormDialogprops> = ({ open, setOpen }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { query, setQuery } = useQueryStore();

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] !max-h-[70vh] !p-0">
          <DialogHeader className="rounded-t-lg p-5 bg-background/50 backdrop-blur-sm backdrop-filter sticky top-0 border-b border-hairline/15">
            <DialogTitle className="font-font-plus-sans tracking-wide text-center text-primary/85">
              Filters
            </DialogTitle>
          </DialogHeader>

          <QueryForm />

          <DialogFooter className="flex items-center lg:!justify-between !p-5 rounded-b-lg bg-background/50 backdrop-blur-sm backdrop-filter border-t border-hairline/15 relative bottom-0 !h-14">
            <Motion.GhostButton className="!py-2 !px-4">
              <span className="font-outfit text-normal">Clear all</span>
            </Motion.GhostButton>

            <Motion.Button className="!py-2 !px-4">
              <span className="font-outfit">Apply</span>
            </Motion.Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-center">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <QueryForm className="px-4" />
        <DrawerFooter className="p-5">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const QueryForm = ({ className }: React.ComponentProps<"form">) => {
  return (
    <ScrollArea className="w-full !h-[50vh]">
      <div className="flex flex-col gap-y-2.5 w-full px-5">
        <ScrollArea  className={cn("relative flex flex-row gap-2.5 overflow-hidden w-full h-32",
        )}
        
        >
          <div className="absolute bottom-2.5 w-full flex flex-col items-center !align-baseline z-20 transition-all duration-300">
            <div className="size-6 bg-accent/25 text-accent/30 grid place-items-center rounded-full">
              <IconFilter className="fill-accent/25" size={16} />
            </div>
            <span className="font-plus-sans text-sm text-primary/85">Select filter</span>
            <span className="font-font-geist-sans text-xs text-primary/75">Selected filters will appear here.</span>
          </div>

          <Dots />
        </ScrollArea >
        <Separator className="!bg-hairline/10" />

        <form className={cn("grid items-start gap-5 mt-2.5", className)}>
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input type="email" id="email" defaultValue="shadcn@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@shadcn" />
          </div>
          {/* <Button type="submit">Save changes</Button> */}
        </form>
      </div>
    </ScrollArea>
  );
};

function Dots() {
  return (
    <div className="absolute top-0 h-32 left-0 w-full bg-background bg-dot-black/[0.2] grid grid-cols-1 z-0">
      <div className="relative w-full h-full flex place-items-center bg-transparent">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
    </div>
  );
}

QueryForm.displayName = "QueryForm";
QueryFormDialog.displayName = "QueryFormDialog";

export { QueryFormDialog };
