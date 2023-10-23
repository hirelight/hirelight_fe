export interface ICreateEmailTemplatesDto {
    organizationId: number;
    emailTypeId: number;
    name: string;
    title: string;
    content: string;
    parameters: string;
}

export interface IEmailTemplatesDto {
    id: number;
    organizationId: number;
    updaterId: number;
    emailTypeId: number;
    name: string;
    title: string;
    content: string;
    parameters: string;
    createdTime: string;
    updatedTime: string;
    status: string;
}

export interface IEditEmailTemplatesDto {
    organizationId: 0;
    emailTypeId: 0;
    name: string;
    title: string;
    content: string;
    parameters: string;
}
