"use client";

import {
  BlurFade,
  Carousel,
  GradientText,
  Input,
  Label,
  Motion,
  Separator,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui";
import { whileTapOptions } from "@/constants";
import { toast, useClinicBySlug } from "@/hooks";
import { cn, getSavingsCopy } from "@/lib";
import {
  IconBookmark,
  IconMailSpark,
  IconPhoneCall
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { ProcedurePanel } from "../components/ui";
import Link from "next/link";
import { ClinicSectionSkeleton } from "@/components/skeletons";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { isEmpty } from "@/_";

const ClinicPreview = () => {
  const params = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const clinicSlug = params?.clinicSlug as string;

  const { data: clinic, isFetching: isFetchingClinic } =
    useClinicBySlug(clinicSlug);

  const generateClinicGallery = (gallery: string[], title: string) => {
    return gallery.map((g) => ({ src: g, title }));
  };

  useEffect(() => {
    if (isBookmarked) {
      toast({
        description: "✅ Clinic saved! Find it in your saved list."
      });
    }
  }, [isBookmarked]);

  const onBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <>
      <BlurFade>
        <section className="w-full flex justify-center relative z-10">
          <div className="container section h-full grid grid-cols-12 gap-5 xl:gap-[30px]">
            {isFetchingClinic && <ClinicSectionSkeleton />}

            {!isFetchingClinic && !isEmpty(clinic) ? (
              <div className="flex flex-col gap-y-5 xl:gap-y-[30px] col-span-12 lg:col-span-7 2xl:col-span-8 border-none">
                <div className="flex flex-col w-full">
                  <div className="flex flex-col md:flex-row md:justify-center md:space-x-2.5 md:items-start">
                    <h2 className="flex-1 flex items-center gap-y-2 gap-x-2.5 flex-wrap">
                      <GradientText
                        text={`${clinic?.name},`}
                        className="font-plus-sans font-extrabold text-3xl lg:text-4xl !leading-[1.25] text-pretty capitalize whitespace-nowrap"
                      />
                      <GradientText
                        text={clinic?.location}
                        gradient="bg-gradient-to-b from-destructive to-accent transition-all duration-500"
                        className="font-plus-sans font-extrabold text-3xl lg:text-4xl !leading-[1.5] text-pretty capitalize whitespace-nowrap transition-all duration-300"
                      />
                    </h2>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <motion.div
                            role="button"
                            aria-roledescription="Bookmark clinic for later"
                            {...whileTapOptions}
                            onClick={onBookmark}
                            className={cn(
                              "size-8 xl:size-9 p-px rounded-full grid place-items-center bg-transparent hover:bg-accent/20 text-accent transition-colors duration-300"
                            )}
                          >
                            <IconBookmark
                              className={cn(isBookmarked && "fill-accent")}
                            />
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <span className="!text-background font-outfit text-sm">
                            Save this clinic for later
                          </span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <ReactMarkdown className="text-sm md:text-base text-secondary/85 mt-0.5 max-w-[80%] text-ellipsis truncate">
                    {getSavingsCopy(
                      clinic?.clinicEstimatedCost,
                      clinic?.usEstimatedCost,
                      "long"
                    )}
                  </ReactMarkdown>
                </div>

                <div className="w-full h-96 2xl:h-[488px] relative overflow-hidden grid grid-cols-1">
                  <Carousel
                    slides={generateClinicGallery(
                      clinic?.gallery || [],
                      clinic?.name || ""
                    )}
                  />
                </div>

                <div className="flex flex-col gap-y-3 w-full">
                  <h4 className="flex-1 flex items-center !capitalize space-x-2.5 flex-nowrap">
                    <GradientText
                      text={"Inside"}
                      className="font-plus-sans font-extrabold text-xl md:text-2xl lg:text-3xl !leading-[1.2] text-pretty capitalize whitespace-nowrap"
                    />{" "}
                    <GradientText
                      text={clinic?.name}
                      gradient="bg-gradient-to-b from-destructive to-accent transition-all duration-500"
                      className="font-plus-sans font-extrabold text-xl md:text-2xl lg:text-3xl !leading-[1.2] text-pretty capitalize whitespace-nowrap transition-all duration-300"
                    />
                  </h4>

                  <p className="font-geist-sans text-secondary/75 text-sm md:text-base lg:text-lg">
                    {clinic?.description}
                  </p>
                </div>

                <div className="flex flex-col gap-y-5 w-full">
                  <h4 className="flex-1 flex items-center !capitalize space-x-2.5 flex-nowrap">
                    <GradientText
                      text={"Procedures"}
                      className="font-plus-sans font-extrabold text-xl md:text-2xl lg:text-3xl !leading-[1.2] text-pretty capitalize whitespace-nowrap"
                    />
                  </h4>

                  <div className="w-full grid grid-cols-1 xl:!grid-cols-2 gap-2.5">
                    {(clinic?.procedures || []).map((procedure, idx) => (
                      <BlurFade
                        key={`blur-fade-in-procedure-${idx}`}
                        delay={0.25 + idx * 0.05}
                        className="h-full grid grid-cols-1 w-full"
                        inView
                      >
                        <ProcedurePanel
                          name={procedure?.name}
                          amount={Number(procedure?.amount)}
                        />
                      </BlurFade>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            <div className="flex flex-col col-span-12 lg:col-span-5 2xl:col-span-4">
              <h5 className="!capitalize">
                <GradientText
                  text={"Speak with a Specialist"}
                  className="font-plus-sans font-extrabold text-xl md:text-2xl lg:text-3xl !leading-[1.2] text-pretty capitalize whitespace-nowrap"
                />
              </h5>

              <p className="text-sm xl:text-base text-secondary/75 mt-2.5">
                We&apos;re here to answer your questions about procedures,
                pricing, and travel logistics.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="grid grid-cols-1 gap-y-2.5 w-full mt-5 xl:mt-[30px]"
              >
                <div className="grid grid-cols-1 gap-y-0 5">
                  <Label
                    htmlFor="name"
                    className="font-plus-sans font-medium text-sm text-secondary/75 mx-1"
                  >
                    Name{" "}
                    <span className="font-plus-sans text-destructive">*</span>
                  </Label>

                  <Input
                    required
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid grid-cols-1 gap-y-0 5">
                  <Label
                    htmlFor="email"
                    className="font-plus-sans font-medium text-sm text-secondary/75 mx-1"
                  >
                    Email{" "}
                    <span className="font-plus-sans text-destructive">*</span>
                  </Label>

                  <Input
                    required
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                  />
                </div>

                <div className="grid grid-cols-1 gap-y-0 5">
                  <Label
                    htmlFor="phone"
                    className="font-plus-sans font-medium text-sm text-secondary/75 mx-1"
                  >
                    Phone (Optional)
                  </Label>

                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Your email address"
                  />
                </div>

                <div className="grid grid-cols-1 gap-y-0 5">
                  <Label
                    htmlFor="message"
                    className="font-plus-sans font-medium text-sm text-secondary/75 mx-1"
                  >
                    Message (Optional)
                  </Label>

                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Ask about pricing, procedures, or availability"
                    className="resize-none"
                  />
                </div>

                <Motion.Button className="mt-2.5">
                  <span className="flex-1 text-center">Send Inquiry</span>
                </Motion.Button>
              </form>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-hairline/20 to-transparent my-5" />

              <div className="flex items-center space-x-2.5 text-primary/75">
                <IconMailSpark size={22} />
                <Link
                  href="mailto:contact@meditravel.com?subject=Inquiry%20About%20MediTravel%20Services&body=Hello%20MediTravel%20Team,%0D%0A%0D%0AI would like to learn more about your services. Please provide me with more details.%0D%0A%0D%0AThank you!"
                  aria-label="Email MediTravel"
                  className="font-outfit hover:brightness-125 text-sm md:text-base tracking-wide transition-all duration-300"
                >
                  contact@meditravel.com
                </Link>
              </div>

              <div className="flex items-center space-x-2.5 text-primary/75 mt-2.5">
                <IconPhoneCall size={22} />
                <Link
                  href="tel:+15551234567"
                  aria-label="contact"
                  className="font-outfit hover:brightness-125 text-sm md:text-base tracking-wide transition-all duration-300"
                >
                  +1 (555) 123-4567
                </Link>
              </div>
            </div>
          </div>
        </section>
      </BlurFade>

      <FloatingActionButton />
    </>
  );
};

const FloatingActionButton = () => {
  return (
    <motion.button
      type="button"
      className={cn(
        "group/fab fixed bottom-8 right-8 z-40 grid place-items-center grid-cols-1 bg-secondary text-secondary-foreground font-outfit rounded-full shadow shadow-secondary-foreground/75 transition-all duration-300 w-14 h-14 hover:w-64 overflow-hidden"
      )}
    >
      <div className="flex items-center group-hover/fab:space-x-2.5 whitespace-nowrap">
        <IconPhoneCall className="w-6 h-6" />

        <span className="inline-block font-outfit opacity-0 w-0 group-hover/fab:opacity-100 group-hover/fab:w-auto transition-opacity duration-500 delay-75">
          Get a Free Consultation
        </span>
      </div>
    </motion.button>
  );
};

export default ClinicPreview;
