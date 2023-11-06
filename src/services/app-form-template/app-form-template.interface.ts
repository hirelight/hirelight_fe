export interface IAppFormTemplateDto {
    id: number;
    organizationId: number;
    updaterId: number;
    name: string;
    content: string;
    createdTime: Date;
    updatedTime: Date;
}

export interface IEditAppFormTemplateDto {
    id: number;
    name: string;
    content: string;
}

export interface ICreateAppFormTemplateDto {
    name: string;
    content: string;
}
