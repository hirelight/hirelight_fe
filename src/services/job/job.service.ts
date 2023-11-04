import endpoints from "@/utils/constants/service-endpoint";
import { IResponse } from "@/interfaces/service.interface";

import interceptor from "../interceptor";

import { ICreateJobDto, IEditJobDto, IJobDto } from "./job.interface";

interface IJobServices {
    getListAsync: () => Promise<IResponse<IJobDto[]>>;
    getByIdAsync: (id: number) => Promise<IResponse<IJobDto>>;
    createAsync: (createJobDto: ICreateJobDto) => Promise<IResponse<any>>;
    editAsync: (editJobDto: IEditJobDto) => Promise<IResponse<any>>;
    deleteByIdAsync: (id: number) => Promise<IResponse<any>>;
    publishJobAsync: (id: number) => Promise<IResponse<any>>;
}

class JobServices implements IJobServices {
    createAsync = async (
        createJobDto: ICreateJobDto
    ): Promise<IResponse<any>> => {
        try {
            const res = await interceptor.post<IResponse<any>>(
                `${endpoints.JOBPOSTS}`,
                createJobDto
            );
            console.log(res);
            if (res.data.statusCode >= 400) throw new Error(res.data.message);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    getListAsync = async (): Promise<IResponse<IJobDto[]>> => {
        try {
            const res = await interceptor.get<IResponse<IJobDto[]>>(
                endpoints.JOBPOSTS
            );

            if (res.data.statusCode >= 400) throw new Error(res.data.message);

            return res.data;
        } catch (error) {
            throw error;
        }
    };

    getByIdAsync = async (id: number): Promise<IResponse<IJobDto>> => {
        try {
            const res = await interceptor.get<IResponse<IJobDto>>(
                `${endpoints.JOBPOSTS}/${id}`
            );

            if (res.data.statusCode >= 400) throw new Error(res.data.message);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    editAsync = async (editJobDto: IEditJobDto): Promise<IResponse<any>> => {
        try {
            const res = await interceptor.put<IResponse<any>>(
                `${endpoints.JOBPOSTS}`,
                editJobDto
            );

            if (res.data.statusCode >= 400) throw new Error(res.data.message);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    deleteByIdAsync = async (id: number): Promise<IResponse<any>> => {
        try {
            const res = await interceptor.delete<IResponse<any>>(
                `${endpoints.JOBPOSTS}/${id}`
            );

            if (res.data.statusCode >= 400) throw new Error(res.data.message);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    publishJobAsync = async (id: number): Promise<IResponse<any>> => {
        try {
            const res = await interceptor.put<IResponse<any>>(
                `${endpoints.JOBPOSTS}/publish/${id}`
            );

            if (res.data.statusCode >= 400) throw new Error(res.data.message);
            return res.data;
        } catch (error) {
            throw error;
        }
    };
}

const jobServices = new JobServices();

export default jobServices;
