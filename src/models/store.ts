export type Location = {
  id: string;
  value: string;
  iso3?: string;
  iso2?: string;
  latitude?: string;
  longitude?: string;
};

export type TreatmentType = Pick<Location, "id" | "value">;
export type Pricerange = string;

export type QueryStore = {
  query: string;
  locations: Location[];
  priceRanges: Pricerange[];
  treatmentTypes: TreatmentType[];

  setQuery: (query: string) => void;
  setLocations: (locations: Location[]) => void;
  setPriceRanges: (priceRanges: Pricerange[]) => void;
  setTreatmentTypes: (treatmentTypes: TreatmentType[]) => void;

  addLocation: (location: Location) => void;
  addPriceRange: (priceRange: string) => void;
  addTreatmentType: (treatmentType: TreatmentType) => void;

  updateLocation: (id: string, updatedLocation: Partial<Location>) => void;
  updatePriceRange: (index: number, newPriceRange: string) => void;
  updateTreatmentType: (
    id: string,
    updatedTreatment: Partial<TreatmentType>
  ) => void;

  removeQuery: () => void;
  removeLocation: (id: string) => void;
  removePriceRange: (index: number) => void;
  removeTreatmentType: (id: string) => void;

  resetQuery: () => void;
  resetLocations: () => void;
  resetPriceRanges: () => void;
  resetTreatmentTypes: () => void;
  resetStore: () => void;
};