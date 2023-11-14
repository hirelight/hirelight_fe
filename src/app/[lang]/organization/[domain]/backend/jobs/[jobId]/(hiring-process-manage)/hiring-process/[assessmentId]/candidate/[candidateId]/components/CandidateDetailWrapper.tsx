"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { getProfileById } from "@/redux/thunks/applicant-profile.thunk";
import LoadingIndicator from "@/components/LoadingIndicator";

const CandidateDetailWrapper = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { candidateId } = useParams();

    const dispatch = useAppDispatch();
    const { loading, data } = useAppSelector(state => state.applicantProfile);

    useEffect(() => {
        if (candidateId) dispatch(getProfileById(candidateId as string));
    }, [candidateId, dispatch]);

    if (loading)
        return (
            <div className="p-12 flex items-center justify-center">
                <LoadingIndicator />
            </div>
        );

    if (data.candidateId === "") {
        console.log("wrapper");
        return <div>No candidate selected</div>;
    }

    return <>{children}</>;
};

export default CandidateDetailWrapper;
