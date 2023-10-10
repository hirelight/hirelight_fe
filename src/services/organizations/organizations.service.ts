import { IResponse } from "@/interfaces/service.interface";

import interceptor from "../interceptor";

import { ICreateOrgDto } from "./organizations.interface";

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
        const res = await interceptor.get<IResponse>(`/organizations`);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getJoinedOrganizations = async () => {
    try {
        const res = await interceptor.get<IResponse>(`/organizations/joined`);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getOwnedOrganizations = async () => {
    try {
        const res = await interceptor.get<IResponse>(`/organizations/owned`);

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
