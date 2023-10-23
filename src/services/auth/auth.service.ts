import { IResponse } from "@/interfaces/service.interface";
import endpoints from "@/utils/constants/service-endpoint";

import interceptor from "../interceptor";

import { LoginRequestDto } from "./auth.interface";

// const loginRequest = async (loginDto: LoginRequestDto) => {
//     const res = await fetch("someurl", {
//         method: "POST",
//         body: JSON.stringify(loginDto),
//     });

//     return res.data;
// };

const getAccessToken = async (loginId: string) => {
    const res = await interceptor.get<IResponse<any>>(
        `/identity/access-tokens?loginId=${loginId}`
    );

    return res.data;
};

const getUserInfo = async () => {
    try {
        const res = await interceptor.get<IResponse<any>>(
            endpoints.IDENTITY_GET_INFO
        );

        if (res.data.statusCode >= 400) throw new Error(res.data.message);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const authServices = { getAccessToken, getUserInfo };

export default authServices;
