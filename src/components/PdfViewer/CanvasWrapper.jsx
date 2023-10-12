import React, { useCallback, useEffect, useRef } from "react";

import styles from "./styles.module.scss";

const CanvasWrapper = React.forwardRef((props, ref) => {
    const { pdfDoc, pageNum, scale } = props;
    const canvasRef = useRef();

    const renderPage = useCallback(async ({ pdfDoc, pageNum, scale }) => {
        const page = await pdfDoc.getPage(pageNum);

        const ctx = canvasRef.current.getContext("2d");

        let viewport = page.getViewport({ scale });

        canvasRef.current.width = viewport.width;
        canvasRef.current.height = viewport.height;

        page.render({
            canvasContext: ctx,
            viewport: viewport,
        });
    }, []);

    useEffect(() => {
        renderPage({ pdfDoc, pageNum, scale });
    }, [pageNum, pdfDoc, renderPage, scale]);
    return (
        <div ref={ref} className={styles.canvas__wrapper}>
            <div className="w-full max-w-full max-h-full overflow-auto">
                <canvas ref={canvasRef} className="mx-auto" />
            </div>
        </div>
    );
});

CanvasWrapper.displayName = "CanvasWrapper";

export default CanvasWrapper;
