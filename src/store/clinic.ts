import { create } from "zustand";
import { Store } from "@/models";
import { indexedDBStorage } from "@/lib";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const useClinicStore = create<Store.ClinicStore>()(
  devtools(
    persist(
      (set, get) => ({
        clinics: [],

        getClinics: () => get().clinics,
        setClinics: (clinics) => set({ clinics }),
        resetClinics: () => set({ clinics: [] })
      }),
      {
        name: "medi-travel/clinic-store",
        storage: createJSONStorage(() => indexedDBStorage)
      }
    ),
    { name: "clinic-store" }
  )
);

export { useClinicStore };
