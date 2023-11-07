export const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number = 300
) => {
    let timeoutId: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

export const delayFunc = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

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
