export interface ICreateQuestionDto {
    content: string;
    difficulty: number;
    tagIdList: number[];
}

export interface IQuestionAnswerDto {
    id: number;
    updaterId: number;
    organizationId: number;
    content: string;
    difficulty: number;
    tagList: IQuestionTagDto[];
    createdTime: Date;
    updatedTime: Date;
    status: string;
}

export interface IEditQuestionAnswerDto extends ICreateQuestionDto {
    id: number;
}

export interface ICreateQuestionTagDto {
    name: string;
}

// *************Question Tag*****************

export interface IQuestionTagDto {
    id: number;
    organizationId: number;
    name: string;
    status: string;
    updaterId: number;
    createdTime: Date;
    updatedTime: Date;
}

export interface ICreateQuestionTagDto {
    name: string;
}

export interface IEditQuestionTagDto extends ICreateQuestionDto {
    id: number;
}
