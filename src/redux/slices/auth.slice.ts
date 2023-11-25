import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

import { IUserInfo } from "@/interfaces/user.interface";
import { decryptData, encryptData } from "@/helpers/authHelpers";

import { fetchAccessToken, loginEmailPwd } from "../thunks/auth.thunk";

type AuthSliceState = {
    token: string;
    authUser: IUserInfo | null;
    loading: boolean;
    authError: any | null;
};

const token = Cookies.get("hirelight_access_token");

const initialState: AuthSliceState = {
    token: "",
    authUser: null,
    authError: null,
    loading: false,
};

// Check localStorage for existing data
const savedData = decryptData("hirelight_access_token");
if (savedData) {
    initialState.token = savedData;
    initialState.authUser = jwtDecode(savedData);
}

const authSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.authUser = jwtDecode(action.payload);
            encryptData("hirelight_access_token", action.payload);
        },
        logout: state => {
            state.token = "";
            state.authUser = null;
            localStorage.removeItem("hirelight_access_token");
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
                encryptData("hirelight_access_token", action.payload);
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
                encryptData("hirelight_access_token", data.accessToken);
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
