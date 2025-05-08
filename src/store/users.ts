import { create } from "zustand";
import { Store } from "@/models";
import { indexedDBStorage } from "@/lib";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const useUserStore = create<Store.UserStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        total: 0,
        page: 0,
        limit: 0,
        users: [],

        getPaginationStats: () => ({
          total: get().total,
          page: get().page,
          limit: get().limit
        }),
        getUsers: () => get().users,
        setAll: (data: Partial<Store.UserStoreState>) =>
          set({ ...get(), ...data })
      }),
      {
        name: "medi-travel/user-store",
        storage: createJSONStorage(() => indexedDBStorage)
      }
    ),
    { name: "user-store" }
  )
);

export { useUserStore };
