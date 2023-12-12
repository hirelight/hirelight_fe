import axios, {
    AxiosError,
    InternalAxiosRequestConfig,
    AxiosResponse,
} from "axios";

import { decryptData } from "@/helpers/authHelpers";

const interceptor = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_API,
});

interceptor.interceptors.request.use((req: InternalAxiosRequestConfig<any>) => {
    const token = decryptData("hirelight_access_token");
    if (token && req.headers) req.headers.Authorization = `Bearer ${token}`;

    return req;
});

interceptor.interceptors.response.use(
    (res: AxiosResponse) => {
        const { code, auto } = res.data;
        if (code === 401) {
            throw new Error("Unauthorized");
        }

        return res;
    },
    (error: AxiosError) => {
        console.log("Interceptor err", error);
        if (error.response?.status === 401) {
            localStorage.removeItem("hirelight_access_token");
        }

        if (error.response) {
            return error.response;
        } else {
            return Promise.reject(error);
        }
    }
);

export default interceptor;
