import { User } from "firebase/auth";
import { Server } from ".";

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
  _tkn: string;
  roles: Server.Role[];
  profile: Server.UserProfile;
  isAuthenticated: boolean;

  hasTkn: () => boolean;
  hasRoles: () => boolean;

  getTkn: () => string;
  getUser: () => User | null;
  getIsAuthenticated: () => boolean;
  getAllRoles: () => Server.Role[];
  getProfile: () => Server.UserProfile;
  getRoleById: (id: string) => Server.Role | null;

  login: (user: User, _tkn: string) => void;
  register: (user: User) => void;
  logout: () => void;
  setTkn: (_tkn: string) => void;
  setRoles: (roles: Server.Role[]) => void;
  setProfile: (profile: Server.UserProfile) => void;
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

export type AnalyticStoreState = {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  deletedUsers: number;
  totalClinics: number;

  getAllUsersAnalytics: () => {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    deletedUsers: number;
  };

  getClinicAnalytics: () => {
    totalClinics: number;
  };

  setAllStats: (stats: Partial<AnalyticStoreState>) => void;
};

export type UserStoreState = {
  total: number;
  page: number;
  limit: number;
  users: Server.IUser[];

  getUsers: () => Server.IUser[];
  getPaginationStats: () => {
    total: number;
    page: number;
    limit: number;
  };

  setAll: (data: Partial<UserStoreState>) => void;
};
