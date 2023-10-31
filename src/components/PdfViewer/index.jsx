"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import * as PDFJS from "pdfjs-dist/build/pdf";
import {
    ArrowsPointingOutIcon,
    MagnifyingGlassMinusIcon,
    MagnifyingGlassPlusIcon,
} from "@heroicons/react/24/outline";
import {
    BackwardIcon,
    ForwardIcon,
    ArrowDownTrayIcon,
    PrinterIcon,
    ArrowsPointingInIcon,
} from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";

import Selection from "../Selection";

import CanvasWrapper from "./CanvasWrapper";

PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;
const defaultUrl =
    "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf";

export default function PDFViewer({ src = defaultUrl }) {
    const [pdf, setPDF] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [scale, setScale] = useState(1);
    const [numPages, setNumPages] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [isExpanding, setIsExpanding] = useState(false);
    const containerRef = useRef(null);
    const componentRef = useRef(null);

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < numPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const zoomOut = () => {
        setScale(scale - 0.1);
    };

    const zoomIn = () => {
        setScale(scale + 0.1);
    };

    const convertBlobToBase64 = data => {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            data = new Blob([data], { type: "application/pdf" });
            fileReader.onload = evt => {
                const result = fileReader.result;
                try {
                    fileReader = null; // clear file reader
                    resolve(result);
                } catch (e) {
                    fileReader = null; // clear file reader
                    reject(e);
                }
            };
            fileReader.readAsDataURL(data);
        });
    };

    const fetchPdf = useCallback(async (pdfData, pageNum, scale) => {
        try {
            const loadingTask = PDFJS.getDocument(pdfData);

            const pdfDoc = await loadingTask.promise;

            setPDF(pdfDoc);

            setNumPages(pdfDoc._pdfInfo.numPages);

            setLoaded(true);
        } catch (error) {
            toast.error("Load pdf failure!");
            console.error(error);
            setLoaded(false);
        }
    }, []);

    const openFullscreen = () => {
        if (containerRef.current) {
            if (containerRef.current.requestFullscreen) {
                containerRef.current.requestFullscreen();
            } else if (containerRef.current.webkitRequestFullscreen) {
                /* Safari */
                containerRef.current.webkitRequestFullscreen();
            } else if (containerRef.current.msRequestFullscreen) {
                /* IE11 */
                containerRef.current.msRequestFullscreen();
            }
            setIsExpanding(true);
        }
    };

    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            /* IE11 */
            document.msExitFullscreen();
        }
        setIsExpanding(false);
    }

    const handleUploadCv = async e => {
        const pdfData = await convertBlobToBase64(e.target.files[0]);

        fetchPdf(pdfData, 1, scale);
    };

    const handleDownloadFile = () => {
        document.title = "My new title";
        window.print();
        return false;
    };

    useEffect(() => {
        fetchPdf(src, 1, 1);
    }, [fetchPdf, src]);

    return (
        <>
            <div
                className="bg-slate-200 p-2 w-full min-h-[400px]"
                ref={containerRef}
            >
                <input type="file" onChange={handleUploadCv} />
                <div className="menu-bar bg-slate-100 flex items-center justify-between p-3 text-neutral-700">
                    <div className="flex gap-4 items-center">
                        <button type="button" onClick={prevPage}>
                            <BackwardIcon className="w-6 h-6" />
                        </button>
                        <button type="button" onClick={nextPage}>
                            <ForwardIcon className="w-6 h-6" />
                        </button>
                        <div className="pagination">
                            Trang {currentPage} / {numPages}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button type="button">
                            <MagnifyingGlassPlusIcon
                                className="w-6 h-6"
                                onClick={zoomIn}
                            />
                        </button>
                        <button type="button">
                            <MagnifyingGlassMinusIcon
                                className="w-6 h-6"
                                onClick={zoomOut}
                            />
                        </button>
                        <Selection
                            title=""
                            items={[
                                "Actual size",
                                "Page fit",
                                "Page width",
                            ].map(item => ({ label: item, value: item }))}
                            onChange={value => {
                                switch (value) {
                                    case "Actual size":
                                        setScale(1);
                                        break;
                                    case "Page fit":
                                        setScale(1.2);
                                        break;
                                }
                            }}
                        />
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            href={defaultUrl}
                            // onClick={handleDownloadFile}
                        >
                            <ArrowDownTrayIcon className="w-6 h-6" />
                        </button>
                        <ReactToPrint content={() => componentRef.current}>
                            <PrintContextConsumer>
                                {({ handlePrint }) => (
                                    <button type="button" onClick={handlePrint}>
                                        <PrinterIcon className="w-6 h-6" />
                                    </button>
                                )}
                            </PrintContextConsumer>
                        </ReactToPrint>
                        <button
                            type="button"
                            onClick={
                                isExpanding ? closeFullscreen : openFullscreen
                            }
                        >
                            {isExpanding ? (
                                <ArrowsPointingInIcon className="w-6 h-6" />
                            ) : (
                                <ArrowsPointingOutIcon className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
                {loaded ? (
                    <CanvasWrapper
                        pdfDoc={pdf}
                        pageNum={currentPage}
                        scale={scale}
                    />
                ) : (
                    <h2
                        style={{
                            color: "#fff",
                            textAlign: "center",
                            fontSize: "40px",
                        }}
                    >
                        Loading...
                    </h2>
                )}
                {loaded && (
                    <div className="w-0 h-0 overflow-hidden">
                        <CanvasWrapper
                            ref={componentRef}
                            pdfDoc={pdf}
                            pageNum={1}
                            scale={1}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
