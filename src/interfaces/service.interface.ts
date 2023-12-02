export interface IResponse<T> {
    data: T;
    statusCode: number;
    status?: number;
    message: string;
    title: string;
}

export default class CustomError extends Error {
    statusCode?: number;
    status?: number;
    title?: string;

    constructor({
        message,
        status,
        statusCode,
        title,
    }: {
        message: string;
        statusCode?: number;
        status?: number;
        title?: string;
    }) {
        super(message);
        this.status = status;
        this.statusCode = statusCode;
        this.title = title;
    }
}
