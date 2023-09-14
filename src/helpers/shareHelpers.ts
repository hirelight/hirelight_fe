export const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number = 300
) => {
    let timeoutId: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
        console.log("Call func");
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};
