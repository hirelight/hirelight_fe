import endpoints from "@/utils/constants/service-endpoint";
import { IResponse } from "@/interfaces/service.interface";
import { checkResErr } from "@/helpers";

import interceptor from "../interceptor";

import {
    AuthResponse,
    LoginCandidateDto,
    LoginEmployerDto,
    RegisterCandidateDto,
    RegisterEmployerDto,
} from "./auth.interface";

const loginCandidate = async (
    loginCandidateDto: LoginCandidateDto
): Promise<IResponse<AuthResponse>> => {
    try {
        const res = await interceptor.post<IResponse<AuthResponse>>(
            `/identity/candidate/login`,
            loginCandidateDto
        );
        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const registerCandidate = async (
    registerCandidateDto: RegisterCandidateDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.post<IResponse<any>>(
            `/identity/candidate/register`,
            registerCandidateDto
        );
        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const loginEmployer = async (
    loginDto: LoginEmployerDto
): Promise<IResponse<AuthResponse>> => {
    try {
        const res = await interceptor.post<IResponse<AuthResponse>>(
            `/identity/employer/login`,
            loginDto
        );
        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const registerEmployee = async (
    registerEmployeeDto: RegisterEmployerDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.post<IResponse<any>>(
            `/identity/employer/register`,
            registerEmployeeDto
        );
        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getAccessToken = async (loginId: string) => {
    const res = await interceptor.get<IResponse<any>>(
        `/identity/access-tokens?loginId=${loginId}`
    );

    return res.data;
};

const getOrgAccessToken = async (id: number) => {
    try {
        const res = await interceptor.get<IResponse<AuthResponse>>(
            `/identity/employer/organizations/${id}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getUserInfo = async () => {
    try {
        const res = await interceptor.get<IResponse<any>>(
            endpoints.IDENTITY_GET_INFO
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const authServices = {
    getAccessToken,
    getUserInfo,
    registerEmployee,
    loginEmployer,
    getOrgAccessToken,
    loginCandidate,
    registerCandidate,
};

export default authServices;
