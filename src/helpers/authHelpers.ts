import CryptoJS from "crypto-js";

export const encryptData = (name: string, data: string) => {
    const encrypted = CryptoJS.AES.encrypt(
        data,
        process.env.NEXT_PUBLIC_SECRET_KEY as string
    ).toString();
    localStorage.setItem(name, encrypted);
};

export const decryptData = (name: string): string | null => {
    if (typeof window !== "undefined") {
        const encrypted = localStorage.getItem(name);
        if (encrypted) {
            const decrypted = CryptoJS.AES.decrypt(
                encrypted,
                process.env.NEXT_PUBLIC_SECRET_KEY as string
            ).toString(CryptoJS.enc.Utf8);

            return decrypted;
        } else return null;
    } else return null;
};
