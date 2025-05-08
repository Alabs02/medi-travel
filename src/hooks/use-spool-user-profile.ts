import { http } from "@/services";
import { routes, successCodes } from "@/constants";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth";
import { Server } from "@/models";

const SPOOL_USER_PROFILE_KEY = "SPOOL_USER_PROFILE";

export const useSpoolUserProfile = (): UseQueryResult<
  Server.UserProfile,
  Error
> => {
  const { hasTkn, setProfile, getUser } = useAuthStore();

  return useQuery<Server.UserProfile, Error>({
    queryKey: [SPOOL_USER_PROFILE_KEY, getUser()?.uid],
    queryFn: async (): Promise<Server.UserProfile> => {
      try {
        const response = await http.get<
          Server.GenericResponse<Server.UserProfile>
        >(routes.internal.USER_PROFILE);

        if (successCodes.includes(response.status) && response.data?.data) {
          setProfile(response.data.data);
          return response.data.data;
        }

        throw new Error(
          `Unexpected response: status=${response.status}, data=${JSON.stringify(response.data)}`
        );
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to fetch user profile: ${error.message}`);
        }
        throw new Error(
          "An unknown error occurred while fetching user profile"
        );
      }
    },
    enabled: hasTkn() && !!getUser()?.uid,
    staleTime: 1000 * 60 * 5,
    retry: 3
  });
};
