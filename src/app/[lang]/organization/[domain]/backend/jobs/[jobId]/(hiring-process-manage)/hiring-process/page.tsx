"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { useAppSelector } from "@/redux/reduxHooks";
import LoadingIndicator from "@/components/LoadingIndicator";

const HiringProcess = () => {
    const router = useRouter();

    const assessmentFLow = useAppSelector(state => state.assessmentFlow.data);

    useEffect(() => {
        router.push(`hiring-process/${assessmentFLow.assessments[0].id}`);
    }, [assessmentFLow.assessments, router]);

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <LoadingIndicator />
        </div>
    );
};

export default HiringProcess;
