import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

import { IUserInfo } from "@/interfaces/user.interface";

import { fetchAccessToken, loginEmailPwd } from "../thunks/auth.thunk";

type AuthSliceState = {
    token: string;
    authUser: IUserInfo | null;
    loading: boolean;
    authError: any | null;
};

const token = Cookies.get("hirelight_access_token");

const initialState: AuthSliceState = {
    token: Cookies.get("hirelight_access_token") ?? "",
    authUser: Cookies.get("hirelight_access_token")
        ? jwtDecode(Cookies.get("hirelight_access_token")!!)
        : null,
    authError: null,
    loading: false,
};
const authSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        logout: state => {
            state.token = "";
            state.authUser = null;
            Cookies.remove("hirelight_access_token");
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAccessToken.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchAccessToken.fulfilled, (state, action) => {
                state.token = action.payload;
                state.authUser = jwtDecode(action.payload);
                Cookies.set("hirelight_access_token", action.payload, {
                    domain: ".localhost",
                    sameSite: "None",
                    secure: true,
                });
                state.loading = false;
            })
            .addCase(fetchAccessToken.rejected, (state, action) => {
                state.loading = false;
            });

        builder
            .addCase(loginEmailPwd.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loginEmailPwd.fulfilled, (state, action) => {
                const { data, message } = action.payload;
                state.token = data.accessToken;
                state.authUser = jwtDecode(data.accessToken);
                Cookies.set("hirelight_access_token", data.accessToken, {
                    domain: ".localhost",
                    sameSite: "None",
                    secure: true,
                });
                state.loading = false;
                toast.success(message);
            })
            .addCase(loginEmailPwd.rejected, (state, action) => {
                state.loading = false;
            });
    },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
