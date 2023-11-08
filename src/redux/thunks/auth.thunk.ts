import { createAsyncThunk } from "@reduxjs/toolkit";

import authServices from "@/services/auth/auth.service";
import { LoginEmployerDto } from "@/services";

const loginOAuth = () => {};

export const fetchAccessToken = createAsyncThunk(
    "auth/fetch-token",
    async (loginId: string) => {
        const res = await authServices.getAccessToken(loginId);

        return res.data.accessToken;
    }
);

export const loginEmailPwd = createAsyncThunk(
    "auth/login-email-password",
    async (loginDto: LoginEmployerDto) => {
        const res = await authServices.loginEmployer(loginDto);

        // setLoading(false);

        // Cookies.set("hirelight_access_token", res.data.accessToken, {
        //     domain:
        //         process.env.NODE_ENV === "production"
        //             ? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
        //             : ".localhost",
        //     sameSite: "None",
        //     secure: true,
        // });

        // if (isAdmin(res.data.accessToken)) return router.push("/admin");
        return res;
    }
);
