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

const jobServices = {
    createAsync,
    getListAsync,
    getByIdAsync,
    editAsync,
    deleteByIdAsync,
    publishJobAsync,
    requestPublishJob,
};

export default jobServices;
