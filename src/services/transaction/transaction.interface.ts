export interface ITracsactionDto {
    id: string;
    employerId: string;
    organizationId: string;
    subscriptionInfoId: string;
    amount: number;
    transactionImageUrl: string;
    content: string;
    currency: string;
    createdTime: Date | string;
    status: string;
    organization: {
        id: string;
        name: string;
        subdomain: string;
        logoUrl: string;
        description: string;
        introduction: string;
        industry: string;
        numberOfEmployees: number;
        nationality: string;
        address: string;
        location: string;
        ownerId: string;
        owner: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            avatarUrl: string;
            status: string;
        };
        subscriptionExpiredTime: "2023-12-14T14:52:49.631Z";
        status: string;
    };
    employer: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        avatarUrl: string;
        status: string;
    };
    subscriptionInfo: {
        name: string;
        amount: number;
        currency: string;
        duration: number;
        employeeCapacity: number;
    };
}

export interface IPaymentResponse {
    return_code: string;
    return_message: string;
    sub_return_code: string;
    sub_return_message: string;
    zp_trans_token: string;
    order_url: string;
    order_token: string;
    app_trans_id: string;
    Id: string;
}

export interface ICreatePaymentDto {
    planId: string | number;
    bankCode: string;
    redirectUrl: string;
}

export interface IPlanDto {
    id: string;
    name: string;
    amount: number;
    currency: string;
    duration: number;
    employeeCapacity: number;
}
