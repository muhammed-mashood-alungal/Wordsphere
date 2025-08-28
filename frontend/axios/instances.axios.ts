'use client'

import axios from "axios";

const createAxiosInstance = (baseUrl: string) => {
  const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("word_sphere_token") : null;
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

const authInstance = createAxiosInstance(
  `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`
);
const userInstance = createAxiosInstance(
  `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`
);
const blogInstance = createAxiosInstance(
  `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`
);

export { authInstance, userInstance, blogInstance };
