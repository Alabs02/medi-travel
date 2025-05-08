import { http } from "@/services";
import { routes, successCodes } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Server } from "@/models";
import { SPOOL_USERS_KEY } from "./use-spool-users";
import { SPOOL_ANALYTICS_KEY } from "./use-spool-analytics";
import { toast } from "./use-toast";

interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  roleId: string;
  photoUrl?: string;
}

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["CREATE_USER"],
    mutationFn: async (payload: CreateUserPayload) => {
      try {
        const response = await http.post<Server.GenericResponse<any>>(
          routes.internal.ADMIN_USERS,
          payload
        );

        if (successCodes.includes(response.status)) {
          return response.data.data;
        }

        throw new Error(`Unexpected response status: ${response.status}`);
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message ||
          error.message ||
          "An error occurred while creating the user.";
        throw new Error(errorMessage);
      }
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [SPOOL_USERS_KEY] });
      queryClient.invalidateQueries({ queryKey: [SPOOL_ANALYTICS_KEY] });

      toast({
        title: "User Created Successfully! 🎉",
        description: "The new user has been added to the system."
      });

      return res;
    },
    onError: (error: Error) => {
      console.error("Failed to create user:", error.message);

      toast({
        variant: "destructive",
        title: "Oops! Something Went Wrong",
        description:
          error.message || "An error occurred while creating the user."
      });
    }
  });
};

export { useCreateUser };
