export const validWorkEmail = (email: string): boolean => {
    return email.slice(email.length - 10, email.length) !== "@gmail.com";
};

export const isInvalidForm = (errs: any) => {
    let status = false;
    const validateError = (errors: any) => {
        for (let key of Object.keys(errors)) {
            if (typeof errors[key as any] === "object") {
                validateError(errors[key as any]);
            } else {
                if (errors[key as any]) {
                    status = true;
                    break;
                }
            }
        }
    };

    validateError(errs);

    return status;
};
