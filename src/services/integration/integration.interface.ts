export interface IIntegrationDto {
    service: string;
    token: IIntegrationToken | null;
}

export interface IIntegrationToken {
    id: string;
    organizationId: string;
    service: string;
    payload: string;
    createdTime: Date;
    updatedTime: Date;
}
export interface ICreateIntegrationDto {
    service: string;
    payload: string;
}

export interface IEditIntegrationDto extends ICreateIntegrationDto {
    id: string;
}
