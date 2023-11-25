import CryptoJS from "crypto-js";
import jwtDecode from "jwt-decode";

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

            if (name === "hirelight_access_token") {
                try {
                    const decoded: any = jwtDecode(decrypted);
                    if (decoded.exp < Date.now() / 1000) {
                        localStorage.removeItem("hirelight_access_token");
                    }
                } catch (error) {
                    return null;
                }
            }
            return decrypted;
        } else return null;
    } else return null;
};
