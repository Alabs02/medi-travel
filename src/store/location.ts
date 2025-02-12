import { create } from "zustand";
import { Store } from "@/models";
import { indexedDBStorage } from "@/lib";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export type LocationStore = {
  cities: Store.Location[];
  states: Store.Location[];
  countries: Store.Location[];
  setCities: (cities: Store.Location[]) => void;
  setStates: (states: Store.Location[]) => void;
  setCountries: (countries: Store.Location[]) => void;
  getCities: () => Store.Location[];
  getStates: () => Store.Location[];
  getCountries: () => Store.Location[];
  getAllLocations: () => Store.Location[];
};

const useLocationStore = create<LocationStore>()(
  devtools(
    persist(
      (set, get) => ({
        cities: [],
        states: [],
        countries: [],
        setCities: (cities) => set({ cities }),
        setStates: (states) => set({ states }),
        setCountries: (countries) => set({ countries }),
        getCities: () => get().cities,
        getStates: () => get().states,
        getCountries: () => get().countries,
        getAllLocations: () => [
          ...get().cities,
          ...get().states,
          ...get().countries
        ]
      }),
      {
        name: "medi-travel/location-cache",
        storage: createJSONStorage(() => indexedDBStorage)
      }
    ),
    { name: "location-cache" }
  )
);

export { useLocationStore };
