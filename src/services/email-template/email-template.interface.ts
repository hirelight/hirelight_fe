export interface ICreateEmailTemplatesDto {
    emailTemplateTypeId: string;
    name: string;
    subject: string;
    content: string;
}

export interface IEmailTemplatesDto {
    id: string;
    organizationId: string;
    updaterId: string;
    emailTemplateType: IEmailTemplateTypeDto;
    name: string;
    subject: string;
    content: string;
    parameters: string;
    createdTime: Date | string;
    updatedTime: Date | string;
    status: string;
}

export interface IEditEmailTemplatesDto {
    id: string;
    name: string;
    subject: string;
    content: string;
    emailTemplateTypeId: string;
}

export interface IEmailTemplateTypeDto {
    id: string;
    name: string;
    parameters: string;
}
