import axios from "axios";
import { getItem } from "../utils/localStorage.util";
import { useEffect } from "react";
import { useAuthContext } from "./useAuthContext.hook";
import toast from "react-hot-toast";


const config = {
  baseURL: "http://localhost:8080/api/",
  timeout: 5000,
};


const useAxiosPrivate = () => {
    const instaliteApi = axios.create(config);
    const token = getItem("token");
    const { user } = useAuthContext();

    useEffect(() => {
        if (token !== undefined) {
        instaliteApi.defaults.headers.common.Authorization = "Bearer " + token;
        }
    }, []);

    useEffect(() => {
      const requestIntercept = instaliteApi.interceptors.request.use(
        (config) => {
          if (!config.headers["Authorization"] || token) {
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
    }, [user]);

    return  instaliteApi
    
};

export default useAxiosPrivate;
