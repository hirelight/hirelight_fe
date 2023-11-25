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
        <div className="p-12 flex items-center justify-center">
            <LoadingIndicator />
        </div>
    );
};

export default HiringProcess;