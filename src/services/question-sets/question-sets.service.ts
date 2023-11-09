import { IResponse } from "@/interfaces/service.interface";
import endpoints from "@/utils/constants/service-endpoint";
import { checkResErr } from "@/helpers";

import interceptor from "../interceptor";
import { ICreateQuesAnsSetDto, IEditQuesAnsSetDto, IQuesAnsSetDto } from "..";

const getListAsync = async (): Promise<IResponse<IQuesAnsSetDto[]>> => {
    try {
        const res = await interceptor.get(endpoints.QUESTION_ANSWER_SETS);

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getByIdAsync = async (id: number): Promise<IResponse<IQuesAnsSetDto>> => {
    try {
        const res = await interceptor.get(
            endpoints.QUESTION_ANSWER_SETS + `/${id}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const createAsync = async (
    createDto: ICreateQuesAnsSetDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.post(
            endpoints.QUESTION_ANSWER_SETS,
            createDto
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const editAsync = async (
    editDto: IEditQuesAnsSetDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put(
            endpoints.QUESTION_ANSWER_SETS + `/${editDto.id}`,
            editDto
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const deleteByIdAsync = async (id: number): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.delete(
            endpoints.QUESTION_ANSWER_SETS + `/${id}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const questionAnsSetServices = {
    getListAsync,
    getByIdAsync,
    createAsync,
    deleteByIdAsync,
    editAsync,
};

export default questionAnsSetServices;
