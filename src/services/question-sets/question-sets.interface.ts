export interface ICreateQuesAnsSetDto {
    name: string;
    content: string;
}

export interface IQuesAnsSetDto {
    id: number;
    updaterId: number;
    organizationId: number;
    name: string;
    content: string;
    createdTime: Date;
    updatedTime: Date;
    status: string;
}

export interface IEditQuesAnsSetDto extends ICreateQuesAnsSetDto {
    id: number;
}
