import React from "react";
import { motion } from "framer-motion";
import { Particles } from "./particles";
import Link from "next/link";
import Image from "next/image";
import { ImagePaths } from "@/constants";
import { usePathname } from "next/navigation";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconBrandYoutube,
  IconMailSpark,
  IconPhoneCall
} from "@tabler/icons-react";

const Footer = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const TitleTag = isHome ? "h6" : "span";

  return (
    <motion.div className="bg-primary w-full min-h-72 shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 relative">
      <div className="w-full h-full relative z-20 bg-gradient-to-b from-primary-foreground/10 via-primary-foreground/5 to-transparent backdrop-filter p-[30px] flex flex-col gap-y-[15px] 2xl:col-span-2">
        <Link href={"/"} className="flex space-x-2.5 items-center" passHref>
          <div className="size-12 relative overflow-hidden">
            <Image
              src={ImagePaths.BRAND_LOGO}
              alt={"MediTravel"}
              width={104}
              height={116}
              quality={100}
              draggable={false}
              priority
              className="size-full object-contain brightness-150"
            />
          </div>

          <TitleTag className="font-plus-sans font-bold text-xl text-primary-foreground brightness-125 tracking-[0.015em] hidden lg:inline-block">
            MediTravel
          </TitleTag>
        </Link>

        <div className="flex items-center space-x-2.5 xl:space-x-5 mt-5">
          <IconBrandInstagram
            className="cursor-pointer text-primary-foreground/75 hover:brightness-125 transition-all duration-300"
            size={26}
          />
          <IconBrandFacebook
            className="cursor-pointer text-primary-foreground/75 hover:brightness-125 transition-all duration-300"
            size={26}
          />
          <IconBrandWhatsapp
            className="cursor-pointer text-primary-foreground/75 hover:brightness-125 transition-all duration-300"
            size={26}
          />
          <IconBrandYoutube
            className="cursor-pointer text-primary-foreground/75 hover:brightness-125 transition-all duration-300"
            size={26}
          />
        </div>

        <div className="flex items-center space-x-2.5 text-primary-foreground">
          <IconMailSpark size={20} />
          <Link
            href="mailto:contact@meditravel.com?subject=Inquiry%20About%20MediTravel%20Services&body=Hello%20MediTravel%20Team,%0D%0A%0D%0AI would like to learn more about your services. Please provide me with more details.%0D%0A%0D%0AThank you!"
            aria-label="Email MediTravel"
            className="font-outfit hover:brightness-125 text-sm tracking-wide transition-all duration-300"
          >
            contact@meditravel.com
          </Link>
        </div>

        <div className="flex items-center space-x-2.5 text-primary-foreground">
          <IconPhoneCall size={20} />
          <Link
            href="tel:+15551234567"
            aria-label="contact"
            className="font-outfit hover:brightness-125 text-sm tracking-wide transition-all duration-300"
          >
            +1 (555) 123-4567
          </Link>
        </div>
      </div>

      <div className="w-full h-full relative z-20 bg-gradient-to-b from-primary-foreground/5 via-primary-foreground/0 to-transparent backdrop-filter py-[30px] px-5 flex flex-col gap-y-[15px]">
        <h6 className="font-plus-sans font-medium text-secondary-foreground/55 text-sm tracking-wide mb-[15px]">
          Quick Links
        </h6>

        <Link
          href={"/"}
          className="font-outfit text-secondary-foreground hover:brightness-125 text-sm tracking-wider transition-all duration-300"
        >
          Explore Clinic
        </Link>
        <Link
          href={"/health-insights"}
          className="font-outfit text-secondary-foreground hover:brightness-125 text-sm tracking-wider transition-all duration-300"
        >
          Health Insights
        </Link>
        <Link
          href={"/our-mission"}
          className="font-outfit text-secondary-foreground hover:brightness-125 text-sm tracking-wider transition-all duration-300"
        >
          Our Mission
        </Link>
      </div>

      <div className="w-full h-full relative z-20 bg-gradient-to-b from-primary-foreground/10 via-primary-foreground/5 to-transparent backdrop-filter py-[30px] px-5 flex flex-col gap-y-[15px]">
        <h6 className="font-plus-sans font-medium text-secondary-foreground/55 text-sm tracking-wide mb-[15px]">
          Popular Destinations
        </h6>

        <Link
          href={"/"}
          className="font-outfit text-secondary-foreground hover:brightness-125 text-sm tracking-wider transition-all duration-300"
        >
          Turkey
        </Link>
        <Link
          href={"/"}
          className="font-outfit text-secondary-foreground hover:brightness-125 text-sm tracking-wider transition-all duration-300"
        >
          Thailand
        </Link>
        <Link
          href={"/"}
          className="font-outfit text-secondary-foreground hover:brightness-125 text-sm tracking-wider transition-all duration-300"
        >
          Singapore
        </Link>
        <Link
          href={"/"}
          className="font-outfit text-secondary-foreground hover:brightness-125 text-sm tracking-wider transition-all duration-300"
        >
          India
        </Link>
        <Link
          href={"/"}
          className="font-outfit text-secondary-foreground hover:brightness-125 text-sm tracking-wider transition-all duration-300"
        >
          Spain
        </Link>
      </div>

      <div className="w-full h-full relative z-20 bg-gradient-to-b from-primary-foreground/5 via-primary-foreground/0 to-transparent backdrop-filter py-[30px] px-5 flex flex-col gap-y-[15px]">
        <h6 className="font-plus-sans font-medium text-secondary-foreground/55 text-sm tracking-wide mb-[15px]">
          Privacy & Policy
        </h6>

        <Link
          href={"/"}
          className="font-outfit text-secondary-foreground hover:brightness-125 text-sm tracking-wider transition-all duration-300"
        >
          Terms of Service
        </Link>

        <Link
          href={"/"}
          className="font-outfit text-secondary-foreground hover:brightness-125 text-sm tracking-wider transition-all duration-300"
        >
          Privacy Policy
        </Link>

        <Link
          href={"/"}
          className="font-outfit text-secondary-foreground hover:brightness-125 text-sm tracking-wider transition-all duration-300"
        >
          Cookie Policy
        </Link>

        <Link
          href={"/"}
          className="font-outfit text-secondary-foreground hover:brightness-125 text-sm tracking-wider transition-all duration-300"
        >
          Subscibe to our Newsletter
        </Link>
      </div>

      <div className="w-full h-full relative z-20 bg-gradient-to-b from-primary-foreground/10 via-primary-foreground/5 to-transparent backdrop-filter py-[30px] px-5 flex flex-col gap-y-[15px]">
        <h6 className="font-plus-sans font-medium text-secondary-foreground/55 text-sm tracking-wide mb-[15px]">
          Contact Us
        </h6>

        <Link
          href={"/"}
          className="font-outfit text-secondary-foreground hover:brightness-125 text-sm tracking-wider transition-all duration-300"
        >
          Email
        </Link>

        <Link
          href={"/"}
          className="font-outfit text-secondary-foreground hover:brightness-125 text-sm tracking-wider transition-all duration-300"
        >
          Live Chat
        </Link>

        <Link
          href={"/"}
          className="font-outfit text-secondary-foreground hover:brightness-125 text-sm tracking-wider transition-all duration-300"
        >
          Messenger
        </Link>

        <Link
          href={"/"}
          className="font-outfit text-secondary-foreground hover:brightness-125 text-sm tracking-wider transition-all duration-300"
        >
          Connect with Us
        </Link>
      </div>

      <Particles
        className="absolute inset-0 z-0"
        quantity={15}
        ease={80}
        color={"#6366f1"}
        refresh
      />

      <Particles
        className="absolute inset-0 z-0"
        quantity={15}
        ease={80}
        color={"#8c64c4"}
        refresh
      />

      <Particles
        className="absolute inset-0 z-0"
        quantity={10}
        ease={80}
        color={"#e6e8ea"}
        refresh
      />

      <Particles
        className="absolute inset-0 z-0"
        quantity={15}
        ease={80}
        color={"#14b8a6"}
        refresh
      />

      <Particles
        className="absolute inset-0 z-0"
        quantity={10}
        ease={80}
        color={"#3c83f6"}
        refresh
      />
    </motion.div>
  );
};

export { Footer };
