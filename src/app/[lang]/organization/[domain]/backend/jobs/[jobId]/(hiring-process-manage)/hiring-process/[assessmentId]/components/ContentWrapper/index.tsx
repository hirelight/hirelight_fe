"use client";

import React, { useEffect } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setAssessment } from "@/redux/slices/assessment.slice";
import { fetchAssessmentById } from "@/redux/thunks/assessment.thunk";
import assessmentsServices from "@/services/assessments/assessments.service";

import Sidebar from "../Sidebar";

import styles from "./styles.module.scss";

const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
    const { assessmentId } = useParams();
    const dispatch = useAppDispatch();
    const { data: assessmentRes } = useQuery({
        queryKey: ["assessment", assessmentId],
        queryFn: () => assessmentsServices.getById(assessmentId as string),
    });

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

    useEffect(() => {
        if (assessmentRes) {
            dispatch(setAssessment(assessmentRes.data));
        }
    }, [assessmentRes, dispatch]);

    return (
        <div className="relative flex">
            <div
                className={`${styles.sidebar__container} ${
                    !showSidebar ? "-translate-x-full" : ""
                }`}
            >
                <div className="flex-1 max-h-screen sticky top-2 bg-white lg:top-0 lg:relative">
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
