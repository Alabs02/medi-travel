import "@fontsource/geist-sans/200.css";
import "@fontsource/geist-sans/300.css";
import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/500.css";
import "@fontsource/geist-sans/600.css";
import "@fontsource/geist-sans/700.css";
import "@fontsource/geist-sans/latin-300.css";
import "@fontsource/geist-sans/latin-400.css";
import "@fontsource/geist-sans/latin-500.css";

import "@fontsource/outfit/300.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import "@fontsource/outfit/latin-300.css";
import "@fontsource/outfit/latin-400.css";
import "@fontsource/outfit/latin-500.css";
import "@fontsource/outfit/latin-600.css";

import "@fontsource/plus-jakarta-sans/300.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";

import { Geist, Outfit, Plus_Jakarta_Sans } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

export const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"]
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"]
});
