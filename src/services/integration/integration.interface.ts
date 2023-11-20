export interface IIntegrationDto {
    id: string;
    organizationId: string;
    service: string;
    payload: string;
    createdTime: string;
    updatedTime: string;
}

export interface ICreateIntegrationDto {
    service: string;
    payload: string;
}

export interface IEditIntegrationDto extends ICreateIntegrationDto {
    id: string;
}
