export interface IResponse<T> {
    data: T;
    statusCode: number;
    status?: number;
    message: string;
    title: string;
}
