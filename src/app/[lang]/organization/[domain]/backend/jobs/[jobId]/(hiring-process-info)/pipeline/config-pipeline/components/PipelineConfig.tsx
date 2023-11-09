"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { AssessmentTypeKey } from "@/interfaces/assessment.interface";
import jobServices from "@/services/job/job.service";
import assessmentFlowsServices from "@/services/assessment-flows/assessment-flows.service";
import { IAssessmentFlowDto } from "@/services/assessment-flows/assessment-flows.interface";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { getJobById } from "@/redux/thunks/job.thunk";
import LoadingIndicator from "@/components/LoadingIndicator";
import { IAssessmentDto } from "@/services/assessments/assessments.interface";

import PipelineStages from "./PipelineStages";
import PipelineConfigAssessment from "./PipelineConfigAssessment";

type PipelineConfigProps = {};

const PipelineConfig: React.FC<PipelineConfigProps> = ({}) => {
    const { jobId } = useParams();
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState<IAssessmentFlowDto | undefined>();
    const [selectedStage, setSelectedStage] = React.useState<
        IAssessmentDto | undefined
    >();
    const dispatch = useAppDispatch();
    const job = useAppSelector(state => state.job.data);

    const fetchWorkflow = useCallback(async (assessmentFlowId: number) => {
        try {
            setLoading(true);
            const flow =
                await assessmentFlowsServices.getByIdAsync(assessmentFlowId);

            setData(flow.data);
            setSelectedStage(flow.data.assessments[0]);
            toast.success(flow.message);
            setLoading(false);
        } catch (error) {
            toast.error("Fialure");
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (job.id === 0) dispatch(getJobById(parseInt(jobId as string)));
        else {
            if (job.assessmentFlowId === 0)
                toast.error("Assessment flow haven't created");
            else fetchWorkflow(job.assessmentFlowId);
        }
    }, [dispatch, jobId, fetchWorkflow, job.id, job.assessmentFlowId]);

    if (!data || isLoading || !selectedStage)
        return (
            <div className="w-full py-11 flex items-center justify-center">
                <LoadingIndicator />
            </div>
        );

    return (
        <div className="flex gap-10">
            <PipelineStages
                stages={data.assessments}
                selectedStage={selectedStage}
                onSelect={(stage: IAssessmentDto) => setSelectedStage(stage)}
            />
            <div className="flex-1">
                <PipelineConfigAssessment assessmentId={selectedStage.id} />
            </div>
        </div>
    );
};

export default PipelineConfig;
