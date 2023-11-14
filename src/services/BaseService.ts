import { IResponse } from "@/interfaces/service.interface";

export interface BaseService<T> {
    getListAsync: () => Promise<IResponse<T[]>>;
    getByIdAsync: (id: string) => Promise<IResponse<T>>;
    createAsync: (createDto: T) => Promise<IResponse<any>>;
    deleteById: (id: string) => IResponse<any>;
    editAsync: (dto: T) => Promise<IResponse<any>>;
}
