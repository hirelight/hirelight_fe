import axios, {
    AxiosError,
    InternalAxiosRequestConfig,
    AxiosResponse,
} from "axios";
import Cookies from "js-cookie";

const interceptor = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_API,
});

interceptor.interceptors.request.use((req: InternalAxiosRequestConfig<any>) => {
    const token = Cookies.get("hirelight_access_token");
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
        console.log("Interceptor err", error.toJSON());
        if (error.response?.status === 401) {
            Cookies.remove("hirelight_access_token");
        }

        if (error.response) {
            return error.response;
        } else {
            return Promise.reject(error);
        }
    }
);

export default interceptor;
