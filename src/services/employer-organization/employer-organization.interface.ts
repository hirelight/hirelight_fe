import { IRoleDto } from "../role/role.interface";

export interface INewEmployerDto {
    employerEmail: string;
    roleId: number;
}

export interface IEditEmployerDto {
    employerEmail: string;
    roleId: number;
}

export interface IEmployerDto {
    id: number;
    employerId: number;
    organizationId: number;
    role: IRoleDto;
    createdTime: Date;
    updatedTime: Date;
    status: "ACTIVE";
}
