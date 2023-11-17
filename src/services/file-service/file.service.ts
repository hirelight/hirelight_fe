import { IResponse } from "@/interfaces/service.interface";
import { checkResErr } from "@/helpers";

import interceptor from "../interceptor";

const getFile = async (fileName: string): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.get<IResponse<any>>(
            "/assessment-flows/files/" + fileName,
            {
                responseType: "blob",
            }
        );
        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const uploadFile = async (formData: FormData): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.post<IResponse<any>>(
            "/assessment-flows/files",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const fileServices = {
    uploadFile,
    getFile,
};

export default fileServices;
