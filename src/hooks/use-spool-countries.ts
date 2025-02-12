"use client";

import { nanoid } from "nanoid";
import { routes } from "@/constants";
import { useLocationStore } from "@/store/location";
import { useQuery } from "@tanstack/react-query";
import { Store } from "@/models";

const fetchCountries = async (): Promise<Store.Location[]> => {
  const headers = new Headers();
  headers.append("X-CSCAPI-KEY", process.env.NEXT_PUBLIC_CSC_API_KEY || "");

  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
    redirect: "follow"
  };

  const response = await fetch(routes.external.SPOOL_COUNTRIES, requestOptions);
  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  const result = await response.json();
  return result.map((r: any) => ({
    id: nanoid(),
    value: r.name,
    iso2: r.iso2,
    iso3: r.iso3
  }));
};

const useSpoolCountries = () => {
  const { setCountries, getCountries } = useLocationStore();
  const existingCountries = getCountries();

  return useQuery<Store.Location[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      const newCountries = await fetchCountries();
      if (
        existingCountries.length === 0 ||
        JSON.stringify(existingCountries) !== JSON.stringify(newCountries)
      ) {
        setTimeout(() => setCountries(newCountries), 2000);
        return newCountries;
      }
      return existingCountries;
    },
    staleTime: 1000 * 60 * 5
  });
};

export { useSpoolCountries };
