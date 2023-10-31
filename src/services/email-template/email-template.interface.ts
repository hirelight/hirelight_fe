export interface ICreateEmailTemplatesDto {
    emailTemplateTypeId: number;
    name: string;
    title: string;
    content: string;
}

export interface IEmailTemplatesDto {
    id: number;
    organizationId: number;
    updaterId: number;
    emailTemplateType: IEmailTemplateTypeDto;
    name: string;
    title: string;
    content: string;
    parameters: string;
    createdTime: string;
    updatedTime: string;
    status: string;
}

export interface IEditEmailTemplatesDto {
    id: number;
    name: string;
    title: string;
    content: string;
    emailTemplateTypeId: number;
}

export interface IEmailTemplateTypeDto {
    id: number;
    name: string;
    parameters: string;
}
