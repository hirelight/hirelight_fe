export interface ICreateQuesAnsSetDto {
    name: string;
    content: string;
}

export interface IQuesAnsSetDto {
    id: string;
    updaterId: string;
    organizationId: string;
    name: string;
    content: string;
    createdTime: Date;
    updatedTime: Date;
    status: string;
}

export interface IEditQuesAnsSetDto extends ICreateQuesAnsSetDto {
    id: string;
}
