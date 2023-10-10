export const validWorkEmail = (email: string): boolean => {
    return email.slice(email.length - 10, email.length) !== "@gmail.com";
};
