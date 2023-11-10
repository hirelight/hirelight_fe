"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";

import LoadingIndicator from "@/components/LoadingIndicator";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { getJobById } from "@/redux/thunks/job.thunk";

const WrapperJobDetail = ({ children }: { children: React.ReactNode }) => {
    const { jobId } = useParams();
    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector(state => state.job);

    useEffect(() => {
        dispatch(getJobById(parseInt(jobId as string)));
    }, [jobId, dispatch]);

    if (data.id === 0 || loading)
        return (
            <div className="p-12 flex items-center justify-center">
                <LoadingIndicator />
            </div>
        );

    return <>{children}</>;
};

export default WrapperJobDetail;
