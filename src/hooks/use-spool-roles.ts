import { http } from "@/services";
import { routes, successCodes } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth";
import { Server } from "@/models";

const SPOOL_ROLES_KEY = "SPOOL_ROLES";

export const useSpoolRoles = () => {
  const { hasRoles, setRoles } = useAuthStore.getState();

  return useQuery({
    queryKey: [SPOOL_ROLES_KEY],
    queryFn: async () => {
      try {
        const response = await http.get<Server.GenericResponse<Server.Role[]>>(
          routes.internal.ROLES
        );

        if (successCodes.includes(response.status)) {
          const roles = response.data?.data;
          if (!roles || !Array.isArray(roles)) {
            throw new Error("Invalid roles data format");
          }

          setRoles(roles);
          return roles;
        }

        throw new Error(`Unexpected response status: ${response.status}`);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching spool roles:", error.message);
        } else {
          console.error("Unknown error occurred while fetching spool roles");
        }
        throw error;
      }
    },
    // enabled: !hasRoles(),
    staleTime: 5 * 60 * 1000,
    retry: 3
  });
};
