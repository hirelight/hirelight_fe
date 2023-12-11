import { Roles } from "..";

export interface LoginEmployerDto {
    email: string;
    password: string;
}
export interface AuthResponse {
    accessToken: string;
}

export interface RegisterEmployerDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface LoginCandidateDto extends LoginEmployerDto {}
export interface RegisterCandidateDto extends RegisterEmployerDto {}

export interface IUserDto {
    userId: string;
    emailAddress: string;
    role: Roles;
    firstName: string;
    lastName: "";
    organizationId: string;
    organizationSubdomain: string;
    exp: 1699646020;
}

export interface IUpdateInfoDto {
    password?: string;
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    timeZone?: number;
    certificates?: string;
    educations?: string;
    experiences?: string;
}
