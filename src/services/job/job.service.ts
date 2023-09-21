import interceptor from "../interceptor";

import { INewJobDto, IUpdateJobDto } from "./job.interface";

export const createNewJob = async (newJobDto: INewJobDto) => {
    const res = await interceptor.post(`/jobs`, newJobDto);
    return res;
};

export const getJobById = async (id: string) => {
    const res = await interceptor.get(`/jobs/${id}`);
    return res;
};

export const updateJobDetail = async (updateJobDto: IUpdateJobDto) => {
    const res = await interceptor.put(`/jobs/${updateJobDto.id}`, updateJobDto);

    return res;
};
