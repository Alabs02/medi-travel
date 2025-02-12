import { isDevMode } from "@/lib";

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (isDevMode() ? "http://localhost:8050" : "https://meditravel.vercel.app");

export default async function sitemap() {
  const staticRoutes = ["/", "/auth/login", "/auth/register"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changefreq: "weekly",
    priority: 0.8
  }));

  // const clinicSlugs = await getClinicSlugs();

  // const clinicRoutes = clinicSlugs.map((slug) => ({
  //   url: `${BASE_URL}/clinic/${slug}`,
  //   lastModified: new Date().toISOString().split("T")[0],
  //   changefreq: "daily",
  //   priority: 0.9
  // }));

  return [...staticRoutes];
}

// async function getClinicSlugs() {
//   const { data: clinics } = await useClinics().refetch();

//   if (!clinics) return [];

//   return clinics.map((clinic) => clinic?.clinicSlug);
// }
