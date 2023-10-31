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
