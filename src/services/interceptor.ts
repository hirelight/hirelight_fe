import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const interceptor = axios.create({
    baseURL: process.env.NEXT_PUBLIC_NODE_RED_URL,
});

interceptor.interceptors.request.use((req: InternalAxiosRequestConfig<any>) => {
    const token = localStorage.getItem("token");
    if (token && req.headers) req.headers.Authorization = `Bearer ${token}`;

    return req;
});

interceptor.interceptors.response.use(
    res => res,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
        }
        return Promise.reject(error.response);
    }
);

export default interceptor;
