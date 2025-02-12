import { create } from "zustand";
import { Store } from "@/models";
import { indexedDBStorage } from "@/lib";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const useAuthStore = create<Store.AuthStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,

        getUser: () => get().user,
        getIsAuthenticated: () => get().isAuthenticated,

        login: (user) => set({ user, isAuthenticated: true }),
        logout: () => set({ user: null, isAuthenticated: false }),
        register: (user) => set({ user, isAuthenticated: true })
      }),
      {
        name: "medi-travel/auth-store",
        storage: createJSONStorage(() => indexedDBStorage)
      }
    ),
    { name: "auth-store" }
  )
);

export { useAuthStore };
