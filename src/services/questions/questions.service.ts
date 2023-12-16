import { IResponse } from "@/interfaces/service.interface";
import { checkResErr } from "@/helpers";
import endpoints from "@/utils/constants/service-endpoint";

import interceptor from "../interceptor";

import {
    ICreateQuestionDto,
    ICreateQuestionTagDto,
    IEditQuestionAnswerDto,
    IEditQuestionTagDto,
    IQuestionAnswerDto,
    IQuestionTagDto,
} from "./questions.interface";

const createAsync = async (
    createQuestionAnswerDto: ICreateQuestionDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.post(
            endpoints.QUESTION_ANSWERS,
            createQuestionAnswerDto
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const uploadQuestionsAsync = async (
    formData: FormData
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.post(
            endpoints.QUESTION_ANSWERS + "/files",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getListAsync = async (): Promise<IResponse<IQuestionAnswerDto[]>> => {
    try {
        const res = await interceptor.get(endpoints.QUESTION_ANSWERS);

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getByIdAsync = async (
    id: string
): Promise<IResponse<IQuestionAnswerDto>> => {
    try {
        const res = await interceptor.get(
            endpoints.QUESTION_ANSWERS + `/${id}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const editAsync = async (
    editQuestionAnswerDto: IEditQuestionAnswerDto
): Promise<IResponse<IQuestionAnswerDto>> => {
    try {
        const res = await interceptor.put(
            endpoints.QUESTION_ANSWERS + `/${editQuestionAnswerDto.id}`,
            editQuestionAnswerDto
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const deleteByIdAsync = async (id: string): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.delete(
            endpoints.QUESTION_ANSWERS + `/${id}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

// ***************Question Tag**********************
const getTagListAsync = async (): Promise<IResponse<IQuestionTagDto[]>> => {
    try {
        const res = await interceptor.get(endpoints.TAGS);

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getTagByIdAsync = async (
    id: string
): Promise<IResponse<IQuestionTagDto>> => {
    try {
        const res = await interceptor.get(endpoints.TAGS + `/${id}`);

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const createTagAsync = async (
    createQuestionTagDto: ICreateQuestionTagDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.post(
            `${endpoints.TAGS}`,
            createQuestionTagDto
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const editTagAsync = async (
    editQuestionTagDto: IEditQuestionTagDto
): Promise<IResponse<IQuestionTagDto>> => {
    try {
        const res = await interceptor.put(
            endpoints.TAGS + `/${editQuestionTagDto.id}`,
            editQuestionTagDto
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const deleteTagByIdAsync = async (id: string): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.delete(endpoints.TAGS + `/${id}`);

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const questionAnswerServices = {
    createAsync,
    getListAsync,
    getByIdAsync,
    editAsync,
    deleteByIdAsync,
    getTagListAsync,
    getTagByIdAsync,
    createTagAsync,
    editTagAsync,
    deleteTagByIdAsync,
    uploadQuestionsAsync,
};

export default questionAnswerServices;
