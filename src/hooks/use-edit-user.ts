import { http } from "@/services";
import { routes, successCodes } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Server } from "@/models";
import { SPOOL_USERS_KEY } from "./use-spool-users";
import { SPOOL_ANALYTICS_KEY } from "./use-spool-analytics";
import { toast } from "./use-toast";

interface Params {
  id: string;
  payload: {
    name: string;
    roleId: string;
    photoUrl?: string;
  };
}

const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["ENABLE_USER"],
    mutationFn: async ({ id, payload }: Params) => {
      if (!id) {
        throw new Error("User ID is required to edit a user.");
      }

      try {
        const response = await http.put<Server.GenericResponse<any>>(
          routes.internal.ADMIN_USER(id),
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
          "An error occurred while editing the user.";
        throw new Error(errorMessage);
      }
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [SPOOL_USERS_KEY] });
      queryClient.invalidateQueries({ queryKey: [SPOOL_ANALYTICS_KEY] });

      toast({
        title: "User Updated Successfully! 🎉",
        description: "The user details have been updated successfully."
      });

      return res;
    },
    onError: (error: Error) => {
      console.error("Failed to edit user:", error.message);

      toast({
        variant: "destructive",
        title: "Oops! Something Went Wrong",
        description:
          error.message || "An error occurred while editing the user."
      });
    }
  });
};

export { useEditUser };
