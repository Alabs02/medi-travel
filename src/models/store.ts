import { User } from "firebase/auth";

export type Location = {
  id: string;
  value: string;
  iso3?: string;
  iso2?: string;
  latitude?: string;
  longitude?: string;
};

export type TreatmentType = Pick<Location, "id" | "value">;
export type PriceRange = [number, number];

export type QueryStore = {
  query: string;
  locations: Location[];
  priceRanges: PriceRange;
  treatmentTypes: TreatmentType[];
  nearbyLocations: any[]; // ! TBD

  getLocations: () => Location[];
  getPriceRanges: () => PriceRange;
  getTreatmentTypes: () => TreatmentType[];

  setQuery: (query: string) => void;
  setLocations: (locations: Location[]) => void;
  setPriceRanges: (priceRanges: PriceRange) => void;
  setNearbyLocations: (nearbyLocations: any[]) => void;
  setTreatmentTypes: (treatmentTypes: TreatmentType[]) => void;

  addLocation: (location: Location) => void;
  addTreatmentType: (treatmentType: TreatmentType) => void;

  updateLocation: (id: string, updatedLocation: Partial<Location>) => void;
  updateTreatmentType: (
    id: string,
    updatedTreatment: Partial<TreatmentType>
  ) => void;

  removeQuery: () => void;
  removeLocation: (id: string) => void;
  // removePriceRange: (index: number) => void;
  removeTreatmentType: (id: string) => void;

  resetQuery: () => void;
  resetLocations: () => void;
  resetPriceRanges: () => void;
  resetTreatmentTypes: () => void;
  resetStore: () => void;
};

export type AuthStoreState = {
  user: User | null;
  isAuthenticated: boolean;

  getUser: () => User | null;
  getIsAuthenticated: () => boolean;

  login: (user: User) => void;
  register: (user: User) => void;
  logout: () => void;
};

export type Clinic = {
  id: string;
  name: string;
  description: string;
  gallery: string[];
  location: string;
  saving: number;
  rating: number;
  clinicSlug: string;
  usEstimatedCost: number;
  clinicEstimatedCost: number;
  procedures: Array<{ name: string; amount: string }>;
  createdBy: {
    id: string;
    name: string;
  };
  dateCreated: string;
};

export type ClinicStore = {
  clinics: Clinic[];
  getClinics: () => Clinic[];
  setClinics: (clinics: Clinic[]) => void;
  resetClinics: () => void;
};
