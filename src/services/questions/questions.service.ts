import { IResponse } from "@/interfaces/service.interface";
import { checkResErr } from "@/helpers";

import interceptor from "../interceptor";

import {
    ICreateQuestionDto,
    ICreateQuestionTagDto,
    IEditQuestionAnswerDto,
    IEditQuestionTagDto,
    IQuestionAnswerDto,
    IQuestionTagDto,
} from "./questions.interface";

const baseEndpoint = "/question-answers";
const baseTagEndpoint = "/tags";

interface IQuestionAnswerService {
    getListAsync: () => Promise<IResponse<IQuestionAnswerDto[]>>;
    getByIdAsync: (id: number) => Promise<IResponse<IQuestionAnswerDto>>;
    createAsync: (createDto: ICreateQuestionDto) => Promise<IResponse<any>>;
    editAsync: (editDto: IEditQuestionAnswerDto) => Promise<IResponse<any>>;
    deleteByIdAsync: (id: number) => Promise<IResponse<any>>;

    getTagListAsync: () => Promise<IResponse<IQuestionTagDto[]>>;
    getTagByIdAsync: (id: number) => Promise<IResponse<IQuestionTagDto>>;
    createTagAsync: (
        createDto: ICreateQuestionTagDto
    ) => Promise<IResponse<any>>;
    editTagAsync: (editDto: IEditQuestionTagDto) => Promise<IResponse<any>>;
    deleteTagByIdAsync: (id: number) => Promise<IResponse<any>>;
}

class QuestionAnswerService implements IQuestionAnswerService {
    createAsync = async (
        createQuestionAnswerDto: ICreateQuestionDto
    ): Promise<IResponse<any>> => {
        try {
            const res = await interceptor.post(
                `${baseEndpoint}`,
                createQuestionAnswerDto
            );

            checkResErr(res.data);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    getListAsync = async (): Promise<IResponse<IQuestionAnswerDto[]>> => {
        try {
            const res = await interceptor.get(baseEndpoint);

            checkResErr(res.data);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    getByIdAsync = async (
        id: number
    ): Promise<IResponse<IQuestionAnswerDto>> => {
        try {
            const res = await interceptor.get(baseEndpoint + `/${id}`);

            checkResErr(res.data);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    editAsync = async (
        editQuestionAnswerDto: IEditQuestionAnswerDto
    ): Promise<IResponse<IQuestionAnswerDto>> => {
        try {
            const res = await interceptor.put(
                baseEndpoint + `/${editQuestionAnswerDto.id}`,
                editQuestionAnswerDto
            );

            checkResErr(res.data);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    deleteByIdAsync = async (id: number): Promise<IResponse<any>> => {
        try {
            const res = await interceptor.delete(baseEndpoint + `/${id}`);

            checkResErr(res.data);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    // ***************Question Tag**********************
    getTagListAsync = async (): Promise<IResponse<IQuestionTagDto[]>> => {
        try {
            const res = await interceptor.get(baseTagEndpoint);

            checkResErr(res.data);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    getTagByIdAsync = async (
        id: number
    ): Promise<IResponse<IQuestionTagDto>> => {
        try {
            const res = await interceptor.get(baseTagEndpoint + `/${id}`);

            checkResErr(res.data);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    createTagAsync = async (
        createQuestionTagDto: ICreateQuestionTagDto
    ): Promise<IResponse<any>> => {
        try {
            const res = await interceptor.post(
                `${baseTagEndpoint}`,
                createQuestionTagDto
            );

            checkResErr(res.data);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    editTagAsync = async (
        editQuestionTagDto: IEditQuestionTagDto
    ): Promise<IResponse<IQuestionTagDto>> => {
        try {
            const res = await interceptor.put(
                baseTagEndpoint + `/${editQuestionTagDto.id}`,
                editQuestionTagDto
            );

            checkResErr(res.data);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    deleteTagByIdAsync = async (id: number): Promise<IResponse<any>> => {
        try {
            const res = await interceptor.delete(baseTagEndpoint + `/${id}`);

            checkResErr(res.data);
            return res.data;
        } catch (error) {
            throw error;
        }
    };
}

const questionAnswerServices = new QuestionAnswerService();

export default questionAnswerServices;
