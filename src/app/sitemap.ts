import { isDevMode } from "@/lib";

export const BASE_URL = isDevMode()
  ? "http://localhost:8050"
  : "https://meditravel.vercel.app";
