import { toast } from "react-toastify";
import { FieldErrors, FieldValues } from "react-hook-form";

import { AssessmentTypeKey } from "@/interfaces/assessment.interface";
import { IResponse } from "@/interfaces/service.interface";
import interceptor from "@/services/interceptor";

export const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number = 300
) => {
    let timeoutId: NodeJS.Timeout;

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            clearTimeout(timeoutId);
            func(...args);
        };

        clearTimeout(timeoutId);
        timeoutId = setTimeout(later, delay);
    };
};

export const delayFunc = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export function humanReadable(seconds: number) {
    let h = seconds / 3600;
    let m = (seconds / 60) % 60;
    let s = seconds % 60;
    return `${h > 9 ? h : `0${h}`}:${m > 9 ? m : `0${m}`}:${
        s > 9 ? s : `0${s}`
    }`;
}

export const resizeImage = async (file: File) => {
    const img = new Image();
    const reader = new FileReader();

    return new Promise<any>((resolve, reject) => {
        reader.onload = e => {
            if (e.target !== null) {
                img.src = e.target.result as string;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    const maxWidth = 300; // Set your desired max width
                    const maxHeight = 300; // Set your desired max height
                    let width = img.width;
                    let height = img.height;
                    const aspectRatio = width / height;

                    if (width > maxWidth || height > maxHeight) {
                        if (width > maxWidth) {
                            width = maxWidth;
                            height = maxWidth / aspectRatio;
                        }
                        if (height > maxHeight) {
                            height = maxHeight;
                            width = maxHeight * aspectRatio;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    if (ctx !== null) ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob(blob => {
                        resolve(blob);
                    }, "image/jpeg"); // You can change the format if needed
                };
            }
        };
        reader.readAsDataURL(file);
    });
};

export const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("formFile", file);

    const res = await interceptor.post<IResponse<any>>(
        "/assessment-flows/images",
        formData,
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );
    console.log(res.data);
    toast.success(res.data.message);

    return res.data.data;
};

export const findInputError = (
    errors: FieldErrors<FieldValues>,
    name: string
) => {
    const filtered = Object.keys(errors)
        .filter(key => key.includes(name))
        .reduce((cur, key) => Object.assign(cur, { error: errors[key] }), {});

    return filtered;
};

export const isFormInvalid = (err: FieldErrors<FieldValues>) => {
    return Object.keys(err).length > 0;
};
