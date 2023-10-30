import { IResponse } from "@/interfaces/service.interface";

import interceptor from "../interceptor";

import { ICreateOrgDto, IOrganizationDto } from "./organizations.interface";

const createNewOrganization = async (createNewOrgDto: ICreateOrgDto) => {
    try {
        const res = await interceptor.post(`/organizations`, createNewOrgDto);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getListOrganizations = async () => {
    try {
        const res = await interceptor.get<IResponse<any>>(`/organizations`);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getJoinedOrganizations = async () => {
    try {
        const res = await interceptor.get<IResponse<IOrganizationDto[]>>(
            `/organizations/joined`
        );
        if (res.data.statusCode >= 400) throw new Error(res.data.message);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getOwnedOrganizations = async () => {
    try {
        const res =
            await interceptor.get<IResponse<IOrganizationDto[]>>(
                `/organizations/owned`
            );
        if (res.data.statusCode >= 400) throw new Error(res.data.message);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const organizationsServices = {
    createNewOrganization,
    getListOrganizations,
    getJoinedOrganizations,
    getOwnedOrganizations,
};

export default organizationsServices;
