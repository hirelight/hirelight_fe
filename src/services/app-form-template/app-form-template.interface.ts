interface IAppFormTemplateDto {
    id: number;
    organizationId: number;
    updaterId: number;
    name: string;
    content: string;
    createdTime: Date;
    updatedTime: Date;
}

interface ICreateAppFormTemplate {
    organizationId: number;
    updaterId: number;
    name: string;
    content: string;
}

interface IEditAppFormTemplate {
    id: number;
    name: string;
    content: string;
}
