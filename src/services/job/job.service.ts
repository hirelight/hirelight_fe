import endpoints from "@/utils/constants/service-endpoint";
import { IResponse } from "@/interfaces/service.interface";
import { checkResErr } from "@/helpers";

import interceptor from "../interceptor";

import { ICreateJobDto, IEditJobDto, IJobDto } from "./job.interface";

const createAsync = async (
    createJobDto: ICreateJobDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.post<IResponse<any>>(
            `${endpoints.JOBPOSTS}`,
            createJobDto
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getListAsync = async (params?: any): Promise<IResponse<IJobDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IJobDto[]>>(
            endpoints.JOBPOSTS + `/search`,
            {
                params,
            }
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getListByGuestAsync = async (
    params?: any
): Promise<IResponse<IJobDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IJobDto[]>>(
            endpoints.JOBPOSTS + `/guest/search`,
            {
                params,
            }
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getByIdAsync = async (id: string): Promise<IResponse<IJobDto>> => {
    try {
        const res = await interceptor.get<IResponse<IJobDto>>(
            `${endpoints.JOBPOSTS}/${id}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const editAsync = async (editJobDto: IEditJobDto): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            `${endpoints.JOBPOSTS}`,
            editJobDto
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const deleteByIdAsync = async (id: string): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.delete<IResponse<any>>(
            `${endpoints.JOBPOSTS}/${id}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const requestPublishJob = async (id: string): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            `${endpoints.JOBPOSTS}/request-publish/${id}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const requestUnpublishJob = async (id: string): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            `${endpoints.JOBPOSTS}/request-unpublish/${id}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const publishJobAsync = async (id: string): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            `${endpoints.JOBPOSTS}/publish/${id}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const unpublishJobAsync = async (id: string): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            `${endpoints.JOBPOSTS}/unpublish/${id}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const suspendJob = async (id: string) => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            endpoints.JOBPOSTS + `/${id}/suspend`
        );

        return res.data;
    } catch (error) {
        throw error;
    }
};

const reactivateJob = async (id: string) => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            endpoints.JOBPOSTS + `/${id}/reactivate`
        );

        return res.data;
    } catch (error) {
        throw error;
    }
};

const jobServices = {
    createAsync,
    getListAsync,
    getByIdAsync,
    editAsync,
    deleteByIdAsync,
    publishJobAsync,
    requestPublishJob,
    suspendJob,
    reactivateJob,
    unpublishJobAsync,
    getListByGuestAsync,
    requestUnpublishJob,
};

export default jobServices;
