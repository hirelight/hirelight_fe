import axios, {
    AxiosError,
    InternalAxiosRequestConfig,
    AxiosResponse,
} from "axios";
import Cookies from "js-cookie";

const interceptor = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_API,
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
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
            if (auto === "yes") {
                console.log("Get new token");
                // console.log('get new token using refresh token', getLocalRefreshToken())
                // return refreshToken().then(rs => {
                //     console.log('get token refreshToken>>', rs.data)
                //     const { token } = rs.data
                //     instance.setToken(token);
                //     const config = response.config
                //     config.headers\['x-access-token'\] = token
                //     config.baseURL = 'http://localhost:3000/'
                //     return instance(config)

                // })
                window.location.href = "/login";
            }
        }

        return res;
    },
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            Cookies.remove("hirelight_access_token");
            window.location.href = "/login";
        }
        if (error.response) {
            return error.response;
        } else {
            return Promise.reject(error);
        }
    }
);

export default interceptor;
