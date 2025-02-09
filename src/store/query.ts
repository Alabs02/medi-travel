import { create } from "zustand";
import { Store } from "@/models";
import { indexedDBStorage } from "@/lib";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const initialState = {
  query: "",
  locations: [],
  treatmentTypes: [],
  priceRanges: []
};

const useQueryStore = create<Store.QueryStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // ✅ Setters
        setQuery: (query) => set({ query }),
        setLocations: (locations) => set({ locations }),
        setPriceRanges: (priceRanges) => set({ priceRanges }),
        setTreatmentTypes: (treatmentTypes) => set({ treatmentTypes }),

        // ✅ Adders
        addLocation: (location) =>
          set((state) => ({ locations: [...state.locations, location] })),
        addPriceRange: (priceRange) =>
          set((state) => ({ priceRanges: [...state.priceRanges, priceRange] })),
        addTreatmentType: (treatmentType) =>
          set((state) => ({
            treatmentTypes: [...state.treatmentTypes, treatmentType]
          })),

        updateLocation: (id, updatedLocation) =>
          set((state) => ({
            locations: state.locations.map((loc) =>
              loc.id === id ? { ...loc, ...updatedLocation } : loc
            )
          })),
        updatePriceRange: (index, newPriceRange) =>
          set((state) => ({
            priceRanges: state.priceRanges.map((range, i) =>
              i === index ? newPriceRange : range
            )
          })),
        updateTreatmentType: (id, updatedTreatment) =>
          set((state) => ({
            treatmentTypes: state.treatmentTypes.map((type) =>
              type.id === id ? { ...type, ...updatedTreatment } : type
            )
          })),

        removeQuery: () => set({ query: "" }),
        removeLocation: (id) =>
          set((state) => ({
            locations: state.locations.filter((loc) => loc.id !== id)
          })),
        removePriceRange: (index) =>
          set((state) => ({
            priceRanges: state.priceRanges.filter((_, i) => i !== index)
          })),
        removeTreatmentType: (id) =>
          set((state) => ({
            treatmentTypes: state.treatmentTypes.filter(
              (treatment) => treatment.id !== id
            )
          })),

        resetQuery: () => set({ query: initialState.query }),
        resetLocations: () => set({ locations: initialState.locations }),
        resetPriceRanges: () => set({ priceRanges: initialState.priceRanges }),
        resetTreatmentTypes: () =>
          set({ treatmentTypes: initialState.treatmentTypes }),
        resetStore: () => set(initialState)
      }),
      {
        name: "medi-travel/query-store",
        storage: createJSONStorage(() => indexedDBStorage)
      }
    ),
    { name: "query-store" }
  )
);

export { useQueryStore };
