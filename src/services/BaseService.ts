import { IResponse } from "@/interfaces/service.interface";

export interface BaseService<T> {
    getListAsync: () => Promise<IResponse<T[]>>;
    getByIdAsync: (id: number) => Promise<IResponse<T>>;
    createAsync: (createDto: T) => Promise<IResponse<any>>;
    deleteById: (id: number) => IResponse<any>;
    editAsync: (dto: T) => Promise<IResponse<any>>;
}
