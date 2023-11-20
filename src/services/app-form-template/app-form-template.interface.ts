export interface IAppFormTemplateDto {
    id: string;
    organizationId: string;
    updaterId: string;
    name: string;
    content: string;
    createdTime: string;
    updatedTime: string;
}

export interface IEditAppFormTemplateDto {
    id: string;
    name: string;
    content: string;
}

export interface ICreateAppFormTemplateDto {
    name: string;
    content: string;
}
