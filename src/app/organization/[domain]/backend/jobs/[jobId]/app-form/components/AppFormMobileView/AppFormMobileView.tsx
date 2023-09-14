"use client";

import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

import { useAppSelector } from "@/redux/reduxHooks";

import styles from "./AppFormMobileView.module.scss";
import AppFormMobileSection from "./AppFormMobileSection";

const AppFormMobileView = () => {
    const [show, setShow] = React.useState(false);
    const job = useAppSelector(state => state.job.data);
    return (
        <>
            <button
                type="button"
                className="block absolute top-4 right-4 lg:hidden peer"
                onClick={() => setShow(true)}
            >
                See
            </button>

            <div
                className={`${
                    styles.wrapper
                } absolute top-0 right-0 bottom-0 bg-white w-0 p-0 overflow-hidden lg:w-auto lg:bg-transparent lg:block lg:relative transition-all ${
                    show ? "w-full px-3 py-2" : ""
                }`}
            >
                <button
                    type="button"
                    className="lg:hidden absolute top-4 right-4"
                    onClick={() => setShow(false)}
                >
                    Hide
                </button>
                <div className={styles.container}>
                    <div className={styles.preview__wrapper}>
                        <div className={styles.preview__container}>
                            <div className="flex flex-col items-center py-6 border-b border-gray-300 bg-white">
                                <h1 className="text-blue_primary_800 text-3xl font-medium mb-2">
                                    Hirelight
                                </h1>
                                <h2 className="text-xl text-neutral-800 font-medium">
                                    {job.title || "Job title"}
                                </h2>
                            </div>
                            <div className="w-full drop-shadow-md bg-white">
                                <div className="flex gap-5 w-fit text-sm font-medium uppercase text-neutral-500 mx-auto">
                                    <span className="py-2 ">Overview</span>
                                    <span className='py-2 text-blue_primary_700 relative after:content-[""] after:absolute after:w-full after:left-0 after:bottom-0 after:h-0.5 rounded-full after:bg-blue_primary_800'>
                                        Application
                                    </span>
                                </div>
                            </div>
                            <div className="pointer-events-none">
                                <AppFormMobileSection />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AppFormMobileView;
