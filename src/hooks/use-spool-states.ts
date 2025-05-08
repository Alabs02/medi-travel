"use client";

import { nanoid } from "nanoid";
import { routes } from "@/constants/api.routes";
import { useLocationStore } from "@/store/location";
import { useQuery } from "@tanstack/react-query";
import { Store } from "@/models";

const fetchStates = async (): Promise<Store.Location[]> => {
  const headers = new Headers();
  headers.append("X-CSCAPI-KEY", process.env.NEXT_PUBLIC_CSC_API_KEY || "");

  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
    redirect: "follow"
  };

  const response = await fetch(routes.external.SPOOL_STATES, requestOptions);
  if (!response.ok) {
    throw new Error("Failed to fetch states");
  }

  const result: Store.Location[] = await response.json();
  return result.map((r: any) => ({
    id: nanoid(),
    value: r.name,
    iso2: r.iso2,
    latitude: r.latitude,
    longitude: r.longitude
  }));
};

const useSpoolStates = () => {
  const { setStates, getStates } = useLocationStore();
  const existingStates = getStates();

  return useQuery<Store.Location[]>({
    queryKey: ["states"],
    queryFn: async () => {
      if (existingStates.length > 0) {
        return existingStates;
      }
      const newStates = await fetchStates();
      setTimeout(() => setStates(newStates), 2000);
      return newStates;
    },
    staleTime: 1000 * 60 * 10
  });
};

export { useSpoolStates };
