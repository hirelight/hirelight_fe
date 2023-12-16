"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import assessmentFlowTemplatesServices from "@/services/assessment-flow-templates/assessment-flow-templates.service";
import { IAssessmentFlow } from "@/services";
import { handleError } from "@/helpers";

import data from "../mock-data.json";

import AssessmentSliderCard from "./AssessmentSliderCard";
import styles from "./styles.module.scss";

const cardWidth: number = 124;
const sliderGap: number = 16;

const AssessmentsSlider = () => {
    const sliderWrapperRef = useRef<HTMLDivElement>(null);

    const [swipeVisible, setSwipeVisible] = useState({
        swipeLeft: false,
        swipeRight: false,
    });

    const {
        data: res,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["assessment-flow-template-default"],
        queryFn: assessmentFlowTemplatesServices.getListAsync,
        select(data) {
            return {
                ...data,
                data: data.data.filter(item => !item.organizationId),
            };
        },
    });

    const handleSlideLeft = () => {
        if (sliderWrapperRef.current) {
            const dx = cardWidth + sliderGap;

            const isLeftMost = sliderWrapperRef.current.scrollLeft - dx <= 0;

            if (isLeftMost) {
                setSwipeVisible(prev => ({ ...prev, swipeLeft: false }));
            }

            sliderWrapperRef.current.scrollLeft -= dx;
            setSwipeVisible(prev => ({ ...prev, swipeRight: true }));
        }
    };

    const handleSlideRight = () => {
        if (sliderWrapperRef.current) {
            const sliderWidth = sliderWrapperRef.current.scrollWidth;
            const dx = cardWidth + sliderGap;

            const isRightMost =
                sliderWrapperRef.current.scrollLeft +
                    sliderWrapperRef.current.clientWidth +
                    dx >=
                sliderWidth;

            if (isRightMost) {
                setSwipeVisible(prev => ({ ...prev, swipeRight: false }));
            }

            sliderWrapperRef.current.scrollLeft += dx;
            setSwipeVisible(prev => ({ ...prev, swipeLeft: true }));
        }
    };

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (sliderWrapperRef.current) {
                if (
                    data.stages.length * (cardWidth + sliderGap) >
                    sliderWrapperRef.current.clientWidth - 16
                ) {
                    setSwipeVisible(prev => ({ ...prev, swipeRight: true }));
                }
            }
        });

        if (sliderWrapperRef.current) {
            if (
                data.stages.length * (cardWidth + sliderGap) >
                sliderWrapperRef.current.clientWidth - 16
            ) {
                setSwipeVisible(prev => ({ ...prev, swipeRight: true }));
            }
        }

        return () => {
            window.removeEventListener("resize", () => {});
        };
    }, []);

    if (isLoading) return <SliderSkeleton />;

    if (isError) return <div></div>;

    return (
        <div className="relative max-w-full">
            {swipeVisible.swipeLeft && (
                <motion.button
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    type="button"
                    className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 z-10 p-1 rounded-md bg-white shadow-lg border border-gray-200"
                    onClick={handleSlideLeft}
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                </motion.button>
            )}
            <div ref={sliderWrapperRef} className={`${styles.slider__wrapper}`}>
                {res &&
                    (JSON.parse(res?.data[0].content) as IAssessmentFlow[]).map(
                        (item, index) => {
                            return (
                                <AssessmentSliderCard
                                    key={item.name}
                                    data={item}
                                />
                            );
                        }
                    )}
            </div>
            {swipeVisible.swipeRight && (
                <motion.button
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    type="button"
                    className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-10 p-1 rounded-md bg-white shadow-lg border border-gray-200"
                    onClick={handleSlideRight}
                >
                    <ChevronRightIcon className="w-5 h-5" />
                </motion.button>
            )}
        </div>
    );
};

export default AssessmentsSlider;

const SliderSkeleton = () => {
    return (
        <div className="relative max-w-full flex justify-between gap-4">
            {new Array(6).fill("").map((_, index) => (
                <div
                    key={index}
                    className="bg-white rounded-md min-w-[124px] h-24 drop-shadow-lg p-2 flex flex-col items-center justify-center animate-pulse"
                >
                    <div className="w-6 h-6 rounded bg-slate-300 mb-2"></div>
                    <div className="w-20 h-5 rounded bg-slate-200"></div>
                </div>
            ))}
        </div>
    );
};
