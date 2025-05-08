import { Roles, RoleTypes } from "@/models/server";
import { useAuthStore } from "@/store/auth";
import axios, { AxiosInstance } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const createHttpClient = (): AxiosInstance => {
  const baseURL = BASE_URL;

  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      "X-API-Version": 1
    }
  });

  instance.interceptors.request.use(
    (config) => {
      const { getTkn } = useAuthStore.getState();
      if (getTkn()) {
        config.headers.Authorization = `Bearer ${getTkn()}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        const { setTkn, getTkn, logout, resetProfile } =
          useAuthStore.getState();

        setTkn("");
        logout();
        resetProfile();

        if (window.location.pathname !== "/") {
          window.location.href = "/";
        } else {
          window.location.href = "/auth/login";
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

const http = createHttpClient();

export { http };
