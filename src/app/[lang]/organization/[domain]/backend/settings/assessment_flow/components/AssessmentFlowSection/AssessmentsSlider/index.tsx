"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import assessmentFlowTemplatesServices from "@/services/assessment-flow-templates/assessment-flow-templates.service";
import { IAssessmentFlow } from "@/services";

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
    const [stagesVisible, setStagesVisible] = useState(9999);
    const [hoverVisible, setHoverVisible] = useState(9999);

    const {
        data: res,
        isLoading,
        error,
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
