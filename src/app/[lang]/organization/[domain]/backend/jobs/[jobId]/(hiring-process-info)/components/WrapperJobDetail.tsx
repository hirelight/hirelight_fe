"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import LoadingIndicator from "@/components/LoadingIndicator";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { getJobById } from "@/redux/thunks/job.thunk";

const WrapperJobDetail = ({ children }: { children: React.ReactNode }) => {
    const { jobId } = useParams();
    const dispatch = useAppDispatch();
    const { data } = useAppSelector(state => state.job);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            setIsLoading(true);
            await dispatch(getJobById(parseInt(jobId as string)));
            setIsLoading(false);
        };

        fetchJob();
    }, [jobId, dispatch]);

    if (data.id === 0 || isLoading)
        return (
            <div className="p-12 flex items-center justify-center">
                <LoadingIndicator />
            </div>
        );

    return <>{children}</>;
};

export default WrapperJobDetail;
