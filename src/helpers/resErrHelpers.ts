import { IResponse } from "@/interfaces/service.interface";

export const checkResErr = (res: IResponse<any>) => {
    if (res.status && res.status >= 400) {
        console.error(res);
        throw new Error(res.title);
    } else if (res.statusCode && res.statusCode >= 400)
        throw new Error(res.message);
};
