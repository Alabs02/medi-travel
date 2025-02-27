import { UI } from "@/models";
import { nanoid } from "nanoid";

export { getAllProcedures } from "./treatment.types";

export const clinics: UI.Clinic[] = [];
const old = [
  {
    id: nanoid(5),
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Bangkok International Hospital",
    location: "Bangkok, Thailand",
    estimateCost: 5000,
    usAverageCost: 18000,
    saving: 13000,
    rating: 4.8,
    tagline: "Knee Replacement Surgery"
  },
  {
    id: nanoid(5),
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Anadolu Medical Center",
    location: "Istanbul, Turkey",
    estimateCost: 7000,
    usAverageCost: 25000,
    saving: 18000,
    rating: 4.7,
    tagline: "Liver Transplant"
  },
  {
    id: nanoid(5),
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Hospital Clínica Bíblica",
    location: "San José, Costa Rica",
    estimateCost: 4000,
    usAverageCost: 15000,
    saving: 11000,
    rating: 0,
    tagline: "Cosmetic Dentistry"
  },
  {
    id: nanoid(5),
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Gleneagles Hospital",
    location: "Singapore",
    estimateCost: 12000,
    usAverageCost: 35000,
    saving: 23000,
    rating: 4.9,
    tagline: "Cardiac Bypass Surgery"
  },
  {
    id: nanoid(5),
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Bumrungrad International Hospital",
    location: "Bangkok, Thailand",
    estimateCost: 9000,
    usAverageCost: 30000,
    saving: 21000,
    rating: 4.9,
    tagline: "Spinal Surgery"
  },
  {
    id: nanoid(5),
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Aster Medcity",
    location: "Kochi, India",
    estimateCost: 3500,
    usAverageCost: 12000,
    saving: 8500,
    rating: 4.7,
    tagline: "Hip Replacement"
  },
  {
    id: nanoid(5),
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Clinica Universidad de Navarra",
    location: "Madrid, Spain",
    estimateCost: 9500,
    usAverageCost: 28000,
    saving: 18500,
    rating: 4.8,
    tagline: "Robotic Prostate Surgery"
  },
  {
    id: nanoid(5),
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Samitivej Sukhumvit Hospital",
    location: "Bangkok, Thailand",
    estimateCost: 4800,
    usAverageCost: 16000,
    saving: 11200,
    rating: 4.6,
    tagline: "Bariatric Surgery"
  },
  {
    id: nanoid(5),
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Mount Elizabeth Novena Hospital",
    location: "Singapore",
    estimateCost: 15000,
    usAverageCost: 40000,
    saving: 25000,
    rating: 4.9,
    tagline: "Neurosurgery"
  },
  {
    id: nanoid(5),
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Medicover Hospital",
    location: "Budapest, Hungary",
    estimateCost: 5200,
    usAverageCost: 18000,
    saving: 12800,
    rating: 4.7,
    tagline: "Dental Implants"
  }
];
