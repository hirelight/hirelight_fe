import { IResponse } from "@/interfaces/service.interface";
import { checkResErr } from "@/helpers";

import interceptor from "../interceptor";

import { ICreateReportDto, IReportDto } from "./report.interface";

const getListByJobPost = async (
    jobPostId: string
): Promise<IResponse<IReportDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IReportDto[]>>(
            `/report/search/jobpost/${jobPostId}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getListByCandidateId = async (
    candidateId: string
): Promise<IResponse<IReportDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IReportDto[]>>(
            `/report/search/candidate/${candidateId}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getById = async (id: string): Promise<IResponse<IReportDto>> => {
    try {
        const res = await interceptor.get<IResponse<IReportDto>>(
            `/report/${id}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const createReport = async (
    createDto: ICreateReportDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.post<IResponse<any>>(
            `/report`,
            createDto
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const deleteById = async (id: string): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.delete<IResponse<any>>(`/report/${id}`);

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const reportServices = {
    getListByCandidateId,
    getListByJobPost,
    getById,
    createReport,
    deleteById,
};

export default reportServices;
