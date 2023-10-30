"use client";

import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";

type PaginationProps = {
    numOfPages: number;
    maxPages?: number;
    onChangePage?: () => void;
};

const Pagination: React.FC<PaginationProps> = ({
    numOfPages,
    maxPages,
    onChangePage,
}) => {
    const [pages, setPages] = useState<number[][]>([]);
    const [curPage, setCurPage] = useState(1);
    const [range, setRange] = useState(0);

    useEffect(() => {
        const subarrays: number[][] = [];
        let currentSubarray: number[] = [];

        for (let i = 1; i <= numOfPages; i++) {
            currentSubarray.push(i);

            if (currentSubarray.length === 5 || i === numOfPages) {
                subarrays.push(currentSubarray);
                currentSubarray = [];
            }
        }
        setPages(subarrays);
    }, [numOfPages]);
    return (
        <nav
            aria-label="Page navigation example"
            className="w-full flex items-center justify-center"
        >
            <ul className="flex items-center -space-x-px h-10 text-base">
                <li>
                    <button
                        type="button"
                        className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={() => {
                            if (curPage === 0) return;
                            setCurPage(prev => prev - 1);
                            setRange(Math.floor((curPage - 1) / 5));
                        }}
                    >
                        <span className="sr-only">Previous</span>
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 1 1 5l4 4"
                            />
                        </svg>
                    </button>
                </li>
                {pages[range]?.map((item, index) => (
                    <li key={index}>
                        <button
                            type="button"
                            className={`${styles.pagination__item} ${
                                item === curPage ? styles.current : ""
                            }`}
                            onClick={() => {
                                setCurPage(item);
                                setRange(Math.floor(item / 5));
                            }}
                        >
                            {item}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        type="button"
                        className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={() => {
                            if (curPage === numOfPages) return;
                            setCurPage(prev => prev + 1);
                            setRange(Math.floor((curPage + 1) / 5));
                        }}
                    >
                        <span className="sr-only">Next</span>
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 9 4-4-4-4"
                            />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
