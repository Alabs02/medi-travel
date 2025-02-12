"use client";

import React, { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib";
import { useMediaQuery } from "@/hooks";

import {
  Label,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DialogFooter,
  Motion,
  ScrollArea
} from "@/components/ui";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import fuzzysort from "fuzzysort";

import { useQueryStore } from "@/store/query";
import {
  IconCheck,
  IconFilter,
  IconMapPin2,
  IconPlus,
  IconStethoscope,
  IconX
} from "@tabler/icons-react";
import { size } from "@/_";
import { Store } from "@/models";
import { getAllProcedures } from "@/db";
import ReactSlider from "react-slider";
import { useLocationStore } from "@/store/location";
import { motion } from "framer-motion";

export type QueryFormDialogprops = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MAX_SELECTION = 3;

const QueryFormDialog: React.FC<QueryFormDialogprops> = ({ open, setOpen }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const {
    resetLocations,
    resetPriceRanges,
    resetTreatmentTypes
  } = useQueryStore();

  const onReset = () => {
    resetLocations();
    resetPriceRanges();
    resetTreatmentTypes();
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] md:min-w-[40vw] 2xl:!min-w-[30vw] min-h-[50vh] max-h-[90vh] overflow-y-auto !p-0">
          <DialogHeader className="rounded-t-lg p-5 bg-background/50 backdrop-blur-sm backdrop-filter sticky z-40 top-0 border-b border-hairline/15 !h-14">
            <DialogTitle className="font-font-plus-sans tracking-wide text-left !text-base text-primary/85">
              Filters
            </DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>

          <QueryForm />

          <DialogFooter className="flex items-center lg:!justify-between !p-5 rounded-b-lg bg-background backdrop-blur-sm backdrop-filter border-t border-hairline/15 sticky bottom-0 z-40 !h-14">
            <Motion.GhostButton
              type="button"
              onClick={onReset}
              className="!py-2 !px-4"
            >
              <span className="font-outfit text-normal !text-sm">
                Clear all
              </span>
            </Motion.GhostButton>

            <Motion.Button
              onClick={() => setOpen(!open)}
              className="!py-2 !px-4"
            >
              <span className="font-outfit !text-sm">Apply</span>
            </Motion.Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="rounded-t-lg p-5 bg-background/50 backdrop-blur-sm backdrop-filter sticky border-b border-hairline/15 !h-14">
          <DrawerTitle className="font-font-plus-sans tracking-wide text-left !text-base text-primary/85">
            Filters
          </DrawerTitle>
          <DrawerDescription className="hidden"></DrawerDescription>
        </DrawerHeader>

        <QueryForm className="px-4" />

        <DrawerFooter className="flex items-center lg:!justify-between !p-5 rounded-b-lg bg-background backdrop-blur-sm backdrop-filter border-t border-hairline/15 sticky bottom-0 z-40 !h-14">
          <Motion.GhostButton
            type="button"
            onClick={onReset}
            className="!py-2 !px-4"
          >
            <span className="font-outfit text-normal !text-sm">Clear all</span>
          </Motion.GhostButton>

          <Motion.Button onClick={() => setOpen(!open)} className="!py-2 !px-4">
            <span className="font-outfit !text-sm">Apply</span>
          </Motion.Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const QueryForm = ({ className }: React.ComponentProps<"form">) => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const { getAllLocations } = useLocationStore();
  const {
    getLocations,
    getTreatmentTypes,
    locations,
    treatmentTypes,
    removeLocation,
    removeTreatmentType
  } = useQueryStore();
  const [hasFilters, setHasFilters] = useState(false);

  useEffect(() => {
    const count = size(getTreatmentTypes()) + size(getLocations());
    setHasFilters(count > 0);
  }, [locations, treatmentTypes]);

  return (
    <>
      <div className="flex flex-col gap-y-2.5 w-full px-5">
        <ScrollArea
          ref={parentRef}
          className={cn("relative grid grud-cols-1 w-full h-32")}
        >
          {hasFilters ? (
            <motion.div className="h-full w-full m-2 flex flex-row flex-wrap gap-2.5 transition-all duration-300">
              {getLocations().map((loc) => (
                <Motion.OutlinedButton
                  key={loc.id}
                  onClick={() => removeLocation(loc.id)}
                  type="button"
                  className="relative !z-40 px-3 py-1.5"
                >
                  <span className="font-outfit text-sm bg-transparent">
                    {loc.value}
                  </span>
                  <IconX size={18} />
                </Motion.OutlinedButton>
              ))}

              {getTreatmentTypes().map((treatmentType) => (
                <Motion.OutlinedButton
                  key={treatmentType.id}
                  onClick={() => removeTreatmentType(treatmentType.id)}
                  type="button"
                  className="relative !z-40 px-3 py-1.5"
                >
                  <span className="font-outfit text-sm bg-transparent">
                    {treatmentType.value}
                  </span>
                  <IconX size={18} />
                </Motion.OutlinedButton>
              ))}
            </motion.div>
          ) : (
            <div className="absolute bottom-2.5 w-full flex flex-col items-center !align-baseline z-20 transition-all duration-300">
              <div className="size-6 lg:size-8 bg-accent/25 text-accent/30 grid place-items-center rounded-full">
                <IconFilter className="fill-accent/25" size={16} />
              </div>
              <span className="font-plus-sans text-sm lg:text-base text-primary/85 mt-1.5">
                Select filter
              </span>
              <span className="font-font-geist-sans text-sm lg:text-sm text-primary/75">
                Selected filters will appear here.
              </span>
            </div>
          )}
          <Dots />
        </ScrollArea>

        <form className={cn("grid items-start gap-y-5 mt-2.5 mb-8", className)}>
          <div className="grid gap-2.5">
            <Label className="font-plus-sans text-sm capitalize text-secondary/75">
              Location
            </Label>
            <LocationDropdown />
          </div>

          <div className="grid gap-2.5">
            <Label className="font-plus-sans text-sm capitalize text-secondary/75">
              Procedures
            </Label>
            <TreatmentDropdown />
          </div>

          <div className="grid gap-2.5">
            <PriceRangeInput />
          </div>
        </form>
      </div>
    </>
  );
};

const LocationDropdown = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [nearbyLocations, setNearbyLocations] = useState([]);

  const { getAllLocations } = useLocationStore();
  const { locations, addLocation, removeLocation } = useQueryStore();

  const allLocations = getAllLocations();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        console.log({ coords });
        // const nearby = await getNearbyLocations(coords.latitude, coords.longitude);
        setNearbyLocations([]);
      },
      (error) => console.warn("Geolocation error:", error.message),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  const filteredLocations = useMemo(() => {
    if (!search) return nearbyLocations;

    const results = fuzzysort.go(search, allLocations, {
      key: "value",
      threshold: -10000
    });
    return results.map((result) => result.obj);
  }, [allLocations, nearbyLocations]);

  const handleSelect = (location: Store.Location) => {
    if (size(locations) < MAX_SELECTION) {
      addLocation(location);
      setSearch("");
      setOpen(false);
    }
  };

  const handleRemove = (id: string) => {
    removeLocation(id);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Motion.OutlinedButton
          disabled={size(locations) === 3}
          className="!flex !justify-between items-center w-full h-10"
        >
          <div className="flex-1 flex items-center space-x-2">
            <IconMapPin2 size={22} />
            <span className="font-outfit text-sm">
              {size(locations) === 3
                ? "Maximum Locations Reached"
                : size(locations) > 0
                  ? `Add Another Location (${3 - size(locations)} Left)`
                  : "Add a Location"}
            </span>
          </div>
          <IconPlus size={22} />
        </Motion.OutlinedButton>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search locations..."
            value={search}
            onValueChange={(value) => setSearch(value)}
          />
          <CommandList>
            {filteredLocations.length === 0 ? (
              <CommandEmpty>No locations found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredLocations.map((location) => (
                  <CommandItem
                    key={location.id}
                    disabled={
                      locations.some((loc) => loc.id === location.id) ||
                      size(locations) >= MAX_SELECTION
                    }
                    onSelect={() => handleSelect(location)}
                  >
                    {location.value}
                    {locations.some((loc) => loc.id === location.id) && (
                      <IconCheck className="ml-auto text-green-500" size={18} />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>

      {/* {size(locations) > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {locations.map((location) => (
            <span
              key={location.id}
              className="flex items-center space-x-1 bg-gray-200 px-2 py-1 rounded-md text-sm"
            >
              {location.value}
              <button
                onClick={() => handleRemove(location.id)}
                className="text-red-500 ml-1"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )} */}
    </Popover>
  );
};

const TreatmentDropdown = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { getTreatmentTypes, addTreatmentType, removeTreatmentType } =
    useQueryStore();

  const allProcedures = getAllProcedures();
  const treatmentTypes = getTreatmentTypes();

  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  const filteredProcedures = useMemo(() => {
    if (!search) return allProcedures;
    const results = fuzzysort.go(search, allProcedures, {
      key: "value",
      threshold: -10000
    });
    return results.map((result) => result.obj);
  }, [allProcedures, search]);

  const handleSelect = (treatment: Store.TreatmentType) => {
    if (size(treatmentTypes) < 3) {
      addTreatmentType(treatment);
      setSearch("");
      setOpen(false);
    }
  };

  const handleRemove = (id: string) => {
    removeTreatmentType(id);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Motion.OutlinedButton
          disabled={size(treatmentTypes) === 3}
          className="!flex !justify-between items-center w-full h-10"
        >
          <div className="flex-1 flex items-center space-x-2">
            <IconStethoscope size={22} />
            <span className="font-outfit text-sm">
              {size(treatmentTypes) === 3
                ? "Maximum Treatments Reached"
                : size(treatmentTypes) > 0
                  ? `Add Another Treatment (${3 - size(treatmentTypes)} Left)`
                  : "Select a Treatment"}
            </span>
          </div>
          <IconPlus size={22} />
        </Motion.OutlinedButton>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search treatments..."
            value={search}
            onValueChange={(value) => setSearch(value)}
          />
          <CommandList>
            {filteredProcedures.length === 0 ? (
              <CommandEmpty>No treatments found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredProcedures.map((treatment) => (
                  <CommandItem
                    key={treatment.id}
                    disabled={
                      treatmentTypes.some((t) => t.id === treatment.id) ||
                      size(treatmentTypes) >= 3
                    }
                    onSelect={() => handleSelect(treatment)}
                  >
                    {treatment.value}
                    {treatmentTypes.some((t) => t.id === treatment.id) && (
                      <IconCheck className="ml-auto text-green-500" size={18} />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const PriceRangeInput = () => {
  const { getPriceRanges, setPriceRanges } = useQueryStore();

  const priceRange = getPriceRanges();

  const handlePriceChange = (value: [number, number]) => {
    setPriceRanges(value);
  };

  return (
    <div className="w-full grid grid-cols-1 gap-y-2.5 p-5 bg-background rounded-md !shadow-[0_0_0_1px] !shadow-hairline/25 relative overflow-hidden">
      <Label
        htmlFor="price-range-input"
        className="font-plus-sans text-sm text-secondary/75 font-semibold mb-10 z-20"
      >
        Price Range
      </Label>

      <div className="space-y-6 z-20">
        <ReactSlider
          className="w-full rounded h-2 relative bg-accent/20 horizontal shadow-[0_0_1px_0] shadow-accent/65"
          thumbClassName="thumb"
          trackClassName="track"
          value={priceRange}
          onChange={handlePriceChange}
          min={1000}
          max={50000}
          step={500}
          pearling
          minDistance={5000}
          renderThumb={({ key, ...rest }, state) => (
            <div {...rest} key={key} className="thumb">
              <div
                className={cn(
                  "tooltip absolute top-[-30px] left-1/2 -translate-x-1/2  bg-accent/20 text-accent font-medium font-outfit text-xs whitespace-nowrap tracking-wide brightness-105 p-1 rounded",
                  state.index === 0 && "ml-1",
                  state.index === 1 && "-translate-x-9"
                )}
              >
                ${state.valueNow}
              </div>
            </div>
          )}
        />

        <div className="flex justify-between text-sm text-secondary/75 bg-transparent">
          <div className="flex flex-col gap-y-2.5">
            <span className="font-plus-sans text-xs capitalize">Minumum</span>

            <span className="block p-2 text-center rounded-md border-none outline-none font-outfit text-sm shadow-[0_0_0_1px] shadow-hairline/25">
              ${priceRange[0]}
            </span>
          </div>

          <div className="flex flex-col gap-y-2.5">
            <span className="font-plus-sans text-xs capitalize">Maximum</span>

            <span className="block p-2 text-center rounded-md border-none outline-none font-outfit text-sm shadow-[0_0_0_1px] shadow-hairline/25">
              ${priceRange[1]}
            </span>
          </div>
        </div>
      </div>

      <Dots className="h-40" />
    </div>
  );
};

const Dots: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        "absolute top-0 h-32 left-0 w-full bg-background bg-dot-black/[0.2] grid grid-cols-1 z-0",
        className
      )}
    >
      <div className="relative w-full h-full flex place-items-center bg-transparent">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
    </div>
  );
};

QueryForm.displayName = "QueryForm";
QueryFormDialog.displayName = "QueryFormDialog";

LocationDropdown.displayName = "LocationDropdown";
TreatmentDropdown.displayName = "TreatmentDropdown";

export { QueryFormDialog, LocationDropdown, TreatmentDropdown };
