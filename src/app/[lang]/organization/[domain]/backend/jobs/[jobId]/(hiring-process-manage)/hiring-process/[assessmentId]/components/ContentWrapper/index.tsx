"use client";

import React, { useEffect } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";

import Sidebar from "../Sidebar";

import styles from "./styles.module.scss";

const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
    const [showSidebar, setShowSidebar] = React.useState(true);

    useEffect(() => {
        window.addEventListener("resize", function (e) {
            e.preventDefault();

            if (this.document.body.clientWidth > 976 && !showSidebar) {
                setShowSidebar(true);
            }
        });
        return () => {
            window.removeEventListener("resize", function (e) {
                e.preventDefault();

                if (this.document.body.clientWidth > 976 && !showSidebar) {
                    setShowSidebar(true);
                }
            });
        };
    }, [showSidebar]);

    return (
        <div className="relative flex">
            <div
                className={`${styles.sidebar__container} ${
                    !showSidebar ? "-translate-x-full" : ""
                }`}
            >
                <Sidebar />
                <button
                    type="button"
                    className={`${styles.sidebar__toggle__btn} ${
                        !showSidebar ? "!rotate-0 !translate-x-full" : ""
                    }`}
                    onClick={() => setShowSidebar(!showSidebar)}
                >
                    <PlayIcon className="w-5 h-5" />
                </button>
            </div>

            <div
                className={`${styles.content__wrapper} ${
                    showSidebar ? "" : "!pl-0"
                }`}
            >
                {children}
            </div>
        </div>
    );
};

export default ContentWrapper;
