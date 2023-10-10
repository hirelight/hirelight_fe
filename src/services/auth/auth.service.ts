import { IResponse } from "@/interfaces/service.interface";

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
    const res = await interceptor.get<IResponse>(
        `/identity/access-tokens?loginId=${loginId}`
    );

    return res.data;
};

const authServices = { getAccessToken };

export default authServices;
