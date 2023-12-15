import { toast } from "react-toastify";
import { FieldErrors, FieldValues } from "react-hook-form";

import { IResponse } from "@/interfaces/service.interface";
import interceptor from "@/services/interceptor";
import fileServices from "@/services/file-service/file.service";

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

export function pad(num: number) {
    return ("0" + num).slice(-2);
}
export function hhmmss(seconds: number) {
    if (seconds < 0) return "00:00:00";
    let h = parseInt((seconds / 3600).toString());
    let m = parseInt((seconds / 60).toString()) % 60;
    let s = seconds % 60;
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
    // return pad(hours)+":"+pad(minutes)+":"+pad(secs); for old browsers
}

export function humanReadable(seconds: number) {
    let h = parseInt((seconds / 3600).toString());
    let m = parseInt((seconds / 60).toString()) % 60;
    let s = seconds % 60;
    const data = {
        hours: h > 9 ? h : `0${h}`,
        minutes: m > 9 ? m : `0${m}`,
        seconds: s > 9 ? s : `0${s}`,
    };
    return data;
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
export const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("formFile", file);

    const res = await fileServices.uploadFile(formData);

    return res.data;
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

export function extractTextFromHtml(htmlString: string): string {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    const bodyText = doc.body ? doc.body.textContent || "" : "";
    return bodyText.trim();
}

export const isDevMode = () =>
    process.env.NEXT_PUBLIC_ROOT_DOMAIN?.includes("localhost") ||
    process.env.NODE_ENV === "development";

export function getRemainingTimeInSeconds(
    startTime: Date | string,
    duration: number
): number {
    const startDatetime: Date = new Date(startTime);
    const endDatetime: Date = new Date(
        startDatetime.getTime() + duration * 60000
    ); // Convert duration to milliseconds
    const currentDatetime: Date = new Date();

    const remainingTimeInSeconds: number = Math.floor(
        (endDatetime.getTime() - currentDatetime.getTime()) / 1000
    );

    return remainingTimeInSeconds;
}
