"use client";

import {
  GradientText,
  Input,
  Motion,
  HeroVideoDialog,
  ClinicCard,
  BlurFade,
  Spotlight,
  EmptyState
} from "@/components/ui";
import {
  IconAdjustmentsSpark,
  IconFilterDollar,
  IconListSearch,
  IconX
} from "@tabler/icons-react";
import { globalMediaFeatures, heroVideo } from "@/constants";
import { PageLayout } from "@/layouts";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AddClinicDialogForm,
  LocationDropdown,
  QueryFormDialog,
  TreatmentDropdown
} from "@/components/forms";
import { useQueryStore } from "@/store/query";
import { debounce, isEmpty } from "@/_";
import Image from "next/image";
import { Hospital } from "lucide-react";
import {
  toast,
  useClinics,
  useSpoolCountries,
  useSpoolRoles,
  useSpoolStates,
  useSpoolUserProfile
} from "@/hooks";
import { ClinicCardSkeleton } from "@/components/skeletons";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

const Home = () => {
  useSpoolCountries();
  useSpoolStates();
  useSpoolRoles();
  useSpoolUserProfile();

  const router = useRouter();
  const [openLocationBox, setOpenLocationBox] = useState(false);
  const [openAddClinicDialog, setOpenAddClinicDialog] = useState(false);
  const [hasFilterParams, setHasFilterParams] = useState(false);

  const {
    query,
    setQuery,
    locations,
    getLocations,
    treatmentTypes,
    getTreatmentTypes,
    resetStore
  } = useQueryStore();

  const { getIsAuthenticated } = useAuthStore();
  const { data: clinics, isFetching: isFetchingClinics } = useClinics();

  const onResetFilterParams = () => {
    resetStore();
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setQuery(value);
    }, 50),
    []
  );

  const onAddClinic = () => {
    if (getIsAuthenticated()) {
      setOpenAddClinicDialog(true);
    } else {
      toast({
        title: "Hold Up! 🚀",
        description:
          "Sign up or log in to add a clinic and help others find affordable care."
      });

      setTimeout(() => {
        router.push("/auth/login");
      }, 100);
    }
  };

  const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  useEffect(() => {
    setHasFilterParams(
      !isEmpty(query) || !isEmpty(getLocations()) || !isEmpty(getTreatmentTypes)
    );
  }, [query, locations, treatmentTypes]);

  return (
    <PageLayout>
      <header className="h-[calc(100vh-100px)] w-full flex justify-center relative z-10">
        <div className="container section h-full grid grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-y-7 2xl:gap-y-[30px]">
            <h2>
              <div className="flex items-center space-x-2.5">
                <GradientText
                  text="Save Up to"
                  className="font-plus-sans font-extrabold text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl !leading-[1.2] text-pretty whitespace-nowrap"
                />{" "}
                <GradientText
                  text="70%"
                  gradient="bg-gradient-to-b from-destructive hover:from-accent to-accent hover:to-destructive transition-all duration-500"
                  className="font-plus-sans font-extrabold text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl !leading-[1.2] text-pretty whitespace-nowrap transition-all duration-300"
                />{" "}
                <GradientText
                  text="on World"
                  className="font-plus-sans font-extrabold text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl !leading-[1.2] text-pretty whitespace-nowrap"
                />
              </div>

              <GradientText
                text="Class Medical Care"
                className="font-plus-sans font-extrabold text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl !leading-[1.2] text-pretty whitespace-nowrap"
              />
            </h2>

            <p className="text lg:text-lg 2xl:text-xl text-secondary/75 mt-2.5 w-full lg:max-w-[90%] 2xl:max-w-[80%]">
              Get access to accredited hospitals and top specialists worldwide
              at a fraction of US costs. Compare clinics, book safely, and
              travel with confidence.
            </p>

            <div className="flex flex-col lg:flex-row lg:items-center gap-5 w-full lg:w-[86%] 2xl:w-[80%]">
              <div className="group/input flex-1 relative rounded-md grid grid-cols-1">
                <IconListSearch
                  className="absolute top-1/2 -translate-y-1/2 left-3 text-secondary/50 group-hover/input:text-accent/65 group-focus-within/input:text-accent/65 transition-all duration-300"
                  size={22}
                />
                <Input
                  value={query}
                  onChange={onSearchQuery}
                  placeholder="Search treatments or specialists..."
                  className="h-full w-full 2xl:!text-base pl-10 pr-20 !min-h-12"
                />

                <div className="absolute top-1/2 -translate-y-1/2 right-3">
                  <motion.button
                    role="button"
                    type="button"
                    onClick={() => setOpenLocationBox(!openLocationBox)}
                    aria-expanded={openLocationBox}
                    className="group/filter-btn flex items-center space-x-1 font-outfit text-sm capitalize py-1 px-2 rounded-full bg-muted hover:brightness-90 overflow-hidden focus-visible:ring-0 focus-visible:outline-none focus-visible:border-none"
                  >
                    <IconAdjustmentsSpark
                      size={18}
                      className="opacity-50 group-hover/filter-btn:opacity-75 rotate-[90deg]"
                    />
                    <span className="font-outfit text-sm text-pretty text-primary/90">
                      Filters
                    </span>
                  </motion.button>
                </div>
              </div>

              <Motion.Button className="h-12" variant={"success"}>
                <span className="font-outfit text-cta text-normal">
                  Find Treatments
                </span>
              </Motion.Button>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center gap-5">
              <Motion.OutlinedButton>
                <span className="font-outfit">Get a Free Consultation</span>
              </Motion.OutlinedButton>

              <Motion.GhostButton>
                <span className="font-outfit">Real Stories, Real Results</span>
              </Motion.GhostButton>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:flex flex-col gap-y-5 hidden">
            <HeroVideoPreview />

            <h3 className="text-xl font-bold text-primary/75 2xl:mt-5">
              Featured in Global Media
            </h3>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2.5">
              {globalMediaFeatures.map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  className="relative h-10 min-w-24 max-w-28 overflow-hidden grid place-items-center"
                >
                  <Image
                    src={src}
                    alt={""}
                    fill
                    priority
                    quality={100}
                    draggable={false}
                    className="size-full object-contain object-center opacity-75 hover:opacity-100 !grayscale transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="relative w-full flex justify-center realtive z-10">
        <div className="container section h-full flex flex-col gap-y-5 items-center">
          <h4
            className="text-center"
            aria-label="Top-Rated Clinics, Affordable Prices"
          >
            <div className="flex items-center space-x-2.5">
              <GradientText
                text="Top-Rated Clinics,"
                className="font-plus-sans font-extrabold text-3xl lg:text-4xl 2xl:text-5xl !leading-[1.2] text-pretty whitespace-nowrap"
              />{" "}
              <GradientText
                text="Affordable Prices"
                gradient="bg-gradient-to-b from-destructive to-accent transition-all duration-500"
                className="font-plus-sans font-extrabold text-3xl lg:text-4xl 2xl:text-5xl !leading-[1.2] text-pretty whitespace-nowrap transition-all duration-300"
              />
            </div>
          </h4>

          <span className="block text-center lg:text-lg 2xl:text-xl text-secondary/75 mt-2.5 w-full lg:max-w-[90%] 2xl:max-w-[80%]">
            Discover accredited hospitals & clinics that match US standards at a
            fraction of the cost.
          </span>

          <div className="flex flex-row items-center justify-center mt-2.5 gap-5 w-full flex-wrap overflow-hidden bg-transparent">
            <div className="grid grid-cols-1 min-w-52 max-w-56 my-px ml-px">
              <LocationDropdown />
            </div>

            <div className="grid grid-cols-1 min-w-56 max-w-60 my-px">
              <TreatmentDropdown />
            </div>

            <Motion.OutlinedButton
              className="h-10 my-px"
              type="button"
              onClick={() => setOpenLocationBox(true)}
            >
              <IconFilterDollar size={20} />
              <span className="font-outfit text-sm">Set Price Range</span>
            </Motion.OutlinedButton>

            <Motion.OutlinedButton
              className="h-10 my-px"
              type="button"
              onClick={onAddClinic}
            >
              <Hospital size={20} />
              <span className="font-outfit text-sm">Add a New Clinic</span>
            </Motion.OutlinedButton>

            {hasFilterParams && (
              <Motion.GhostButton
                className="my-px !px-3 !py-1.5"
                type="button"
                onClick={onResetFilterParams}
              >
                <span className="font-outfit text-xs">Reset</span>
                <IconX size={15} />
              </Motion.GhostButton>
            )}
          </div>

          {isEmpty(clinics) && !isFetchingClinics ? (
            <EmptyState className="mt-5" onClick={onAddClinic} />
          ) : null}

          {isFetchingClinics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 xl:gap-[30px]  mt-5 w-full transition-all duration">
              {Array(8)
                .fill(0)
                .map((_, idx) => (
                  <BlurFade
                    key={`blur-fade-skeleton-${idx}`}
                    delay={0.15 + idx * 0.05}
                    inView
                  >
                    <ClinicCardSkeleton />
                  </BlurFade>
                ))}
            </div>
          )}

          {!isEmpty(clinics) && !isFetchingClinics ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 xl:gap-[30px]  mt-5 w-full transition-all duration">
              {(clinics || []).map(({ clinicSlug, ...rest }, idx) => (
                <BlurFade
                  key={`blur-fade-${clinicSlug}`}
                  delay={0.25 + idx * 0.05}
                  inView
                >
                  <ClinicCard
                    {...rest}
                    clinicSlug={clinicSlug}
                    key={`clinic-card-${clinicSlug}`}
                    href={`clinic/${clinicSlug}`}
                  />
                </BlurFade>
              ))}
            </div>
          ) : null}
        </div>

        <Spotlight />
      </main>

      <QueryFormDialog open={openLocationBox} setOpen={setOpenLocationBox} />
      <AddClinicDialogForm
        open={openAddClinicDialog}
        setOpen={setOpenAddClinicDialog}
      />
      <HeroDots />
    </PageLayout>
  );
};

function HeroDots() {
  return (
    <div className="absolute top-0 h-screen left-0 w-full bg-background bg-dot-black/[0.2] grid grid-cols-1 z-0">
      <div className="relative w-full h-full flex place-items-center bg-transparent">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
    </div>
  );
}

function HeroVideoPreview() {
  return (
    <div className="relative">
      <HeroVideoDialog
        className="block dark:hidden !bg-transparent"
        animationStyle="from-center"
        {...heroVideo}
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="from-center"
        {...heroVideo}
      />
    </div>
  );
}
export default Home;
