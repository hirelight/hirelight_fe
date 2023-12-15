"use client";

import React from "react";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/solid";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";

import { useAppSelector } from "@/redux/reduxHooks";
import { debounce } from "@/helpers/shareHelpers";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import styles from "./AppFormMobileView.module.scss";
import AppFormMobileSection from "./AppFormMobileSection";

type AppFormMobileViewProps = {};

const AppFormMobileView: React.FC<AppFormMobileViewProps> = ({}) => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "app-form");

    const [show, setShow] = React.useState(false);
    const job = useAppSelector(state => state.job.data);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const [translateY, setTranslateY] = React.useState(0);

    React.useEffect(() => {
        document.addEventListener(
            "scroll",
            debounce(() => {
                if (containerRef.current && wrapperRef.current) {
                    const rect = containerRef.current.getBoundingClientRect();
                    const validDy =
                        wrapperRef.current.getBoundingClientRect().height -
                        rect.height;
                    if (rect.top < 0) {
                        setTranslateY(prev =>
                            Math.min(prev - rect.top, validDy)
                        );
                    } else if (rect.top > 0) {
                        let dy = Math.min(
                            rect.top,
                            Math.abs(
                                wrapperRef.current.getBoundingClientRect().top
                            )
                        );

                        setTranslateY(prev => Math.max(0, prev - dy));
                    }
                }
            }, 300)
        );

        return () => {
            document.removeEventListener("scroll", () => {});
        };
    }, []);

    return (
        <>
            <button
                type="button"
                className="block absolute top-4 right-4 lg:hidden peer"
                onClick={() => setShow(true)}
            >
                <DevicePhoneMobileIcon className="h-6 w-auto text-neutral-700" />
            </button>

            <div
                ref={wrapperRef}
                className={`${
                    styles.wrapper
                } absolute top-0 right-0 bottom-0 bg-white w-0 p-0 overflow-hidden lg:w-auto lg:bg-transparent lg:block lg:relative transition-all ${
                    show ? "w-full p-4" : ""
                }`}
            >
                <button
                    type="button"
                    className="lg:hidden absolute top-4 right-4"
                    onClick={() => setShow(false)}
                >
                    <DocumentTextIcon className="w-6 h-auto text-neutral-700" />
                </button>
                <div
                    ref={containerRef}
                    className={styles.container}
                    style={{
                        transform: `translateY(${translateY}px)`,
                    }}
                >
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
                                    <span className="py-2 ">
                                        {t("common:overview")}
                                    </span>
                                    <span className='py-2 text-blue_primary_700 relative after:content-[""] after:absolute after:w-full after:left-0 after:bottom-0 after:h-0.5 rounded-full after:bg-blue_primary_800'>
                                        {t("common:application")}
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
