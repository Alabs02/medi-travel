import { http } from "@/services";
import { routes, successCodes } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Server } from "@/models";
import { SPOOL_USERS_KEY } from "./use-spool-users";
import { SPOOL_ANALYTICS_KEY } from "./use-spool-analytics";
import { toast } from "./use-toast";

const useDisableUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["DISABLE_USER"],
    mutationFn: async (id: string) => {
      if (!id) {
        throw new Error("User ID is required to disable a user.");
      }

      try {
        const response = await http.patch<Server.GenericResponse<any>>(
          routes.internal.ADMIN_DISABLE_USER(id)
        );

        if (successCodes.includes(response.status)) {
          return response.data.data;
        }

        throw new Error(`Unexpected response status: ${response.status}`);
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message ||
          error.message ||
          "An error occurred while disabling the user.";
        throw new Error(errorMessage);
      }
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [SPOOL_USERS_KEY] });
      queryClient.invalidateQueries({ queryKey: [SPOOL_ANALYTICS_KEY] });

      toast({
        title: "Success! 🎉",
        description: "The user has been successfully disabled."
      });

      return res;
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error! ❌",
        description: error.message || "Failed to disable the user."
      });

      console.error("Failed to disable user:", error.message);
    }
  });
};

export { useDisableUser };
