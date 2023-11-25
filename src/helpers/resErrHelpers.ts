import { toast } from "react-toastify";

import { IResponse } from "@/interfaces/service.interface";

export const checkResErr = (res: IResponse<any>) => {
    if (res.status && res.status >= 400) {
        console.error(res);
        throw new Error(res.title);
    } else if (res.statusCode && res.statusCode >= 400)
        throw new Error(res.message);
};

export const handleError = (res: IResponse<any>) => {
    if (res.statusCode) {
        switch (res.statusCode) {
            case 400: {
                if (res.message) toast.error(res.message);
                else toast.error("Bad input!");
                break;
            }
            case 401: {
                if (res.message) toast.error(res.message);
                else toast.error("Session timout! Please login again!");
                break;
            }
            case 404: {
                if (res.message) toast.error(res.message);
                else toast.error("Data not found!");
                break;
            }
            case 409: {
                if (res.message) toast.error(res.message);
                else toast.error("Data content in wrong format!");
                break;
            }
            case 500: {
                if (res.message) toast.error(res.message);
                else toast.error("Internal server error!");
                break;
            }
            default:
                toast.error("Something went wrong!");
        }
    }

    if (res.status) {
        switch (res.status) {
            case 400: {
                if (res.message) toast.error(res.message);
                else toast.error("Bad input!");
                break;
            }
            case 401: {
                if (res.message) toast.error(res.message);
                else toast.error("Session timout! Please login again!");
                break;
            }
            case 404: {
                if (res.message) toast.error(res.message);
                else toast.error("Data not found!");
                break;
            }
            case 409: {
                if (res.message) toast.error(res.message);
                else toast.error("Data content in wrong format!");
                break;
            }
            case 500: {
                if (res.message) toast.error(res.message);
                else toast.error("Internal server error!");
                break;
            }
            default:
                toast.error("Something went wrong!");
        }
    }
};
