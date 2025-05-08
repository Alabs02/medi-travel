import { create } from "zustand";
import { Server, Store } from "@/models";
import { indexedDBStorage } from "@/lib";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const useAuthStore = create<Store.AuthStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        _tkn: "",
        roles: [],
        profile: {} as Server.UserProfile,
        isAuthenticated: false,

        getProfile: () => get().profile,
        setProfile: (profile: Server.UserProfile) => set({ profile }),

        hasRoles: () => get().roles.length > 0,
        hasTkn: () => get()._tkn !== "",

        getTkn: () => get()._tkn,
        getUser: () => get().user,
        getAllRoles: () => get().roles,
        getIsAuthenticated: () => get().isAuthenticated,
        getRoleById: (id: string) =>
          get().roles.find((role) => role.id === id) || null,

        resetProfile: () => set({ profile: {} as Server.UserProfile }),

        login: (user, _tkn: string) =>
          set({ user, _tkn, isAuthenticated: true }),
        logout: () => set({ user: null, isAuthenticated: false }),
        register: (user) => set({ user, isAuthenticated: true }),
        setRoles: (roles: Server.Role[]) => set({ roles }),
        setTkn: (_tkn: string) => set({ _tkn })
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
