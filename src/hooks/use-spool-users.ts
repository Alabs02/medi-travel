import { http } from "@/services";
import { routes, successCodes } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { Server } from "@/models";
import { useUserStore } from "@/store/users";
import { useAuthStore } from "@/store/auth";

export const SPOOL_USERS_KEY = "SPOOL_USERS";

interface Params {
  page: number;
  limit: number;
  search?: string | null;
  isActive?: boolean | null;
  from?: string | null;
  to?: string | null;
}

export const useSpoolUsers = (params: Params) => {
  const { setAll } = useUserStore.getState();
  const { hasTkn } = useAuthStore.getState();

  return useQuery({
    queryKey: [SPOOL_USERS_KEY, params],
    queryFn: async () => {
      try {
        const response = await http.get<
          Server.PaginatedResponse<Server.IUser[]>
        >(routes.internal.SPOOL_USERS(params));

        if (successCodes.includes(response.status)) {
          const { results, ...rest } = response.data?.data;

          setAll({ users: results, ...rest });

          return response.data?.data;
        }

        throw new Error(
          `Unexpected response status: ${response.status}. Expected one of: ${successCodes.join(", ")}`
        );
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching spool users:", error.message);
        } else {
          console.error(
            "An unknown error occurred while fetching spool users."
          );
        }
        throw error;
      }
    },
    enabled: Boolean(hasTkn() && params.page && params.limit),
    staleTime: 5 * 60 * 1000,
    retry: 3
  });
};
