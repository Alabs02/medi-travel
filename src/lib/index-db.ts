import { get, set, del } from "idb-keyval";

const indexedDBStorage = {
  getItem: async (name: string) => (await get(name)) ?? null,
  setItem: async (name: string, value: any) => await set(name, value),
  removeItem: async (name: string) => await del(name)
};

export { indexedDBStorage };
