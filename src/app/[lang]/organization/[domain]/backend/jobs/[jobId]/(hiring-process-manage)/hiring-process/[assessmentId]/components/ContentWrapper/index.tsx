"use client";

import React from "react";
import { PlayIcon } from "@heroicons/react/24/solid";

import Sidebar from "../Sidebar";

import styles from "./styles.module.scss";

const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
    const [showSidebar, setShowSidebar] = React.useState(true);

    return (
        <div className="relative flex">
            <div className={`${styles.sidebar__container}`}>
                <Sidebar />
                <button
                    type="button"
                    className={`${styles.sidebar__toggle__btn} ${
                        showSidebar ? "rotate-180 translate-x-1/2" : ""
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
