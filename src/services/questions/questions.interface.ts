export interface ICreateQuestionDto {
    content: string;
    difficulty: number;
    tagIdList: string[];
}

export interface IQuestionAnswerDto {
    id: string;
    updaterId: string;
    organizationId: string;
    content: string;
    difficulty: number;
    tagList: IQuestionTagDto[];
    createdTime: string;
    updatedTime: string;
    status: string;
}

export interface IEditQuestionAnswerDto extends ICreateQuestionDto {
    id: string;
}

export interface ICreateQuestionTagDto {
    name: string;
}

// *************Question Tag*****************

export interface IQuestionTagDto {
    id: string;
    organizationId: string;
    name: string;
    status: string;
    updaterId: string;
    createdTime: string;
    updatedTime: string;
}

export interface ICreateQuestionTagDto {
    name: string;
}

export interface IEditQuestionTagDto extends ICreateQuestionDto {
    id: string;
}
