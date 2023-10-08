"use client";

import React from "react";
import { PlayIcon } from "@heroicons/react/24/solid";

import Sidebar from "../Sidebar";

import styles from "./styles.module.scss";

const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const sidebarRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);

    const [showSidebar, setShowSidebar] = React.useState(true);

    React.useEffect(() => {
        document.addEventListener("scroll", () => {
            if (wrapperRef.current && sidebarRef.current) {
                const { y } = wrapperRef.current.getBoundingClientRect();

                if (y <= 8 && !sidebarRef.current.hasAttribute("style")) {
                    sidebarRef.current.setAttribute(
                        "style",
                        "position: fixed; top:0.5rem; height: calc(100vh - 8px)"
                    );
                } else if (y > 8 && sidebarRef.current.hasAttribute("style")) {
                    sidebarRef.current.removeAttribute("style");
                }
            }
        });

        return () => {
            document.removeEventListener("scroll", () => {});
        };
    }, []);

    return (
        <div ref={wrapperRef} className="flex justify-between relative">
            <div
                ref={sidebarRef}
                className={`${styles.sidebar__wrapper} ${
                    !showSidebar ? styles.hide : ""
                }`}
            >
                <div className={`${styles.sidebar__container}`}>
                    <Sidebar />
                </div>
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

            <div ref={contentRef} className={styles.content__wrapper}>
                {children}
            </div>
        </div>
    );
};

export default ContentWrapper;
