"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  User
} from "firebase/auth";
import { auth } from "@/firebase";
import { useAuthStore } from "@/store/auth";
import { toast } from "./use-toast";
import { isEmpty } from "@/_";

export const loginAction = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const logoutAction = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const registerAction = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, {
      displayName: `${firstName} ${lastName}`
    });
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const checkAuthAction = (): Promise<User | null> => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      const { login, logout } = useAuthStore.getState();
      if (isEmpty(user)) {
        logout();
      } else {
        const _tkn = await user.getIdToken();
        login(user, _tkn);
      }
      resolve(user);
    });
  });
};

export const useLogin = () => {
  const login = useAuthStore.getState().login;

  return useMutation({
    mutationKey: ["login"],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginAction(email, password),
    onSuccess: async (payload: User) => {
      if (payload) {
        const _tkn = await payload.getIdToken();

        login(payload, _tkn);

        console.log({ _tkn });

        setTimeout(() => {
          toast({
            title: "Welcome Back! 🎉",
            description:
              "You're now logged in. Let's find the best care for you!"
          });
        }, 0);
      }
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Oops! Something Went Wrong",
        description:
          "Couldn't log you in. Double-check your credentials or try again later."
      });
    }
  });
};

export const useRegister = () => {
  const register = useAuthStore.getState().register;

  return useMutation({
    mutationKey: ["register"],
    mutationFn: ({
      email,
      password,
      firstName,
      lastName
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => registerAction(email, password, firstName, lastName),
    onSuccess: (payload: User) => {
      if (payload) {
        register(payload);

        setTimeout(() => {
          toast({
            title: "Welcome Aboard! 🎉",
            description:
              "Your account is ready. Find the best treatments today!"
          });
        }, 0);
      }
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Oops! Something Went Wrong",
        description: "Couldn't create your account. Try again later."
      });
    }
  });
};

export const useLogout = () => {
  const logout = useAuthStore.getState().logout;

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutAction,
    onSuccess: () => {
      logout();

      toast({
        title: "Goodbye for Now! 👋",
        description: "You've been logged out. Come back anytime!"
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Oops! Something Went Wrong",
        description: "An error occured. Kindly try again later."
      });
    }
  });
};

export const useCheckAuth = () => {
  return useQuery({
    queryKey: ["checkAuth"],
    queryFn: checkAuthAction
  });
};
