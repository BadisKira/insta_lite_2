import axios from "axios";
import { getItem } from "../utils/localStorage.util";
import { useLayoutEffect } from "react";
import toast from "react-hot-toast";





const useAxiosPrivate = () => {
  const baseURL = import.meta.env.VITE_REACT_APP_INSTALITE_API_BASE_URL; // || ("http://localhost:8080/api/");

  const config = {
    baseURL,
    timeout: 5000,
  };
  const instaliteApi = axios.create(config);
  const token = getItem("token");

  useLayoutEffect(() => {
    const requestIntercept = instaliteApi.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = instaliteApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          toast.error("Veuillez vous reconnecter SVP");
        }
      }
    );

    return () => {
      instaliteApi.interceptors.request.eject(requestIntercept);
      instaliteApi.interceptors.response.eject(responseIntercept);
    };
  });

  return instaliteApi;
};

export default useAxiosPrivate;
