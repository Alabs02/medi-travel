import { BASE_URL } from "@/app/sitemap";

export const ImagePaths = {
  BRAND_LOGO: "/images/medi-travel-logo.webp",
  HERO_THUMBNAIL: "/images/hero-video-thumbnail.webp",
  BBC_LOGO: "/images/bbc.webp",
  WHO_LOGO: "/images/who.webp",
  BLOOMBERG_LOGO: "/images/blloomberg.webp",
  THE_GUARDIAN_LOGO: "/images/the-guardian.webp",
  MEDI_TRAVEL_HERO: "/images/medi-travel-hero.webp",
  EMPTY_STATE: "/images/empty-state.svg"
};

export const seo = {
  title: {
    default:
      "MediTravel – Trusted Medical Travel & Healthcare Booking Platform",
    template: "%s | MediTravel"
  },
  description:
    "MediTravel connects patients with top healthcare providers worldwide, making medical travel seamless. Compare treatments, book appointments, and access end-to-end support for a stress-free experience.",
  keywords: [
    "medical travel",
    "healthcare tourism",
    "medical tourism",
    "treatment abroad",
    "international healthcare",
    "book medical appointments",
    "affordable healthcare",
    "best hospitals worldwide",
    "surgery abroad",
    "MediTravel"
  ],
  openGraph: {
    title: "MediTravel – Seamless Medical Travel & Healthcare Booking",
    description:
      "Find, compare, and book top-rated healthcare providers worldwide with MediTravel. Safe, affordable, and hassle-free medical travel.",
    images: [
      {
        url: `${BASE_URL}${ImagePaths.MEDI_TRAVEL_HERO}`,
        width: 1200,
        height: 630,
        alt: "MediTravel – Seamless Medical Travel & Healthcare Booking"
      }
    ],
    locale: "en_US",
    type: "website",
    url: BASE_URL,
    siteName: "MediTravel"
  },
  twitter: {
    card: "summary_large_image",
    title: "MediTravel – Global Medical Travel Made Easy",
    description:
      "Trusted platform for booking medical treatments abroad. Find accredited healthcare providers & travel with confidence.",
    images: [
      {
        url: `${BASE_URL}${ImagePaths.BRAND_LOGO}`,
        width: 1200,
        height: 630,
        alt: "MediTravel – Global Medical Travel Made Easy"
      }
    ]
  }
};

export const globalMediaFeatures = [
  ImagePaths.BLOOMBERG_LOGO,
  ImagePaths.BBC_LOGO,
  ImagePaths.WHO_LOGO,
  ImagePaths.THE_GUARDIAN_LOGO
];

export const heroVideo = {
  videoSrc: "https://youtu.be/Zup7cT2HZHk?si=97H-IehuoS5Xknmp",
  thumbnailSrc: ImagePaths.HERO_THUMBNAIL,
  thumbnailAlt: "Hero Video | MediTravel"
};

export const whileTapOptions = {
  whileTap: { scale: 0.9 },
  initial: { scale: 1 },
  transition: {
    scale: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      mass: 0.2,
      ease: "easeInOut"
    },
    duration: 0.03
  }
};

export * from "./api.routes";
