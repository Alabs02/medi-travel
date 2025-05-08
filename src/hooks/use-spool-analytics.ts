import { http } from "@/services";
import { routes, successCodes } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { Server } from "@/models";
import { useAnalyticStore } from "@/store/analytics";

export const SPOOL_ANALYTICS_KEY = "SPOOL_ANALYTICS";

export const useSpoolAnalytics = () => {
  const { setAllStats } = useAnalyticStore.getState();

  return useQuery({
    queryKey: [SPOOL_ANALYTICS_KEY],
    queryFn: async () => {
      try {
        const response = await http.get<
          Server.GenericResponse<Server.Analytics>
        >(routes.internal.ADMIN_ANALYTICS);

        if (!successCodes.includes(response.status)) {
          console.error(`Unexpected status code: ${response.status}`);
          throw new Error("Failed to fetch spool analytics");
        }

        if (!response.data?.data) {
          console.error("Response data is missing or malformed");
          throw new Error("Invalid response structure");
        }

        setAllStats(response.data.data);

        return response.data.data;
      } catch (error) {
        console.error("Error fetching spool analytics:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error) => {
      console.warn(`Retry attempt ${failureCount} due to error:`, error);
      return failureCount < 3; // Retry up to 3 times
    }
  });
};
