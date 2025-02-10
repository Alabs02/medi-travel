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