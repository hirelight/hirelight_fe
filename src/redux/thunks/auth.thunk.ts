import { createAsyncThunk } from "@reduxjs/toolkit";

import authServices from "@/services/auth/auth.service";
import { LoginEmployerDto } from "@/services";

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
        return res;
    }
);
