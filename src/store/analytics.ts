import { create } from "zustand";
import { Store } from "@/models";
import { indexedDBStorage } from "@/lib";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const useAnalyticStore = create<Store.AnalyticStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        totalUsers: 0,
        activeUsers: 0,
        inactiveUsers: 0,
        deletedUsers: 0,
        totalClinics: 0,

        getAllUsersAnalytics: () => {
          const { totalUsers, activeUsers, inactiveUsers, deletedUsers } =
            get();
          return { totalUsers, activeUsers, inactiveUsers, deletedUsers };
        },
        getClinicAnalytics: () => {
          const { totalClinics } = get();
          return { totalClinics };
        },
        setAllStats: (stats: Partial<Store.AnalyticStoreState>) => {
          set((state) => ({
            ...state,
            ...stats
          }));
        }
      }),
      {
        name: "medi-travel/analytic-store",
        storage: createJSONStorage(() => indexedDBStorage)
      }
    ),
    { name: "analytic-store" }
  )
);

export { useAnalyticStore };
