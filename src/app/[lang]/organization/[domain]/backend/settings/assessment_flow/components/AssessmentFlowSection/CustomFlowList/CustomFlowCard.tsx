"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";

import {
    IAssessmentFlTempDto,
    IEditAssessmentFlTempDto,
} from "@/services/assessment-flow-templates/assessment-flow-templates.interface";
import { IAssessmentFlow } from "@/services/assessment-flows/assessment-flows.interface";
import assessmentFlowTemplatesServices from "@/services/assessment-flow-templates/assessment-flow-templates.service";
import { DeleteModal, Portal } from "@/components";

import AssessmentFlowForm from "../AssessmentFlowForm";

type CustomFlowCardProps = {
    data: Omit<IAssessmentFlTempDto, "content"> & {
        assessments: IAssessmentFlow[];
    };
};

const CustomFlowCard: React.FC<CustomFlowCardProps> = ({ data }) => {
    const [showEditing, setShowEditing] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const queryClient = useQueryClient();
    const updateTemplateMutation = useMutation({
        mutationFn: (createDto: IEditAssessmentFlTempDto) =>
            assessmentFlowTemplatesServices.editASync(createDto),
        onSuccess: res => {
            toast.success(res.message);
            queryClient.invalidateQueries({
                queryKey: ["assessment-flow-templates"],
            });
        },
        onError: err => {
            toast.error(err.message);
        },
    });
    const deleteTemplateMutation = useMutation({
        mutationFn: (id: string) =>
            assessmentFlowTemplatesServices.deleteByIdAsync(id),
        onSuccess: res => {
            toast.success(res.message);
            queryClient.invalidateQueries({
                queryKey: ["assessment-flow-templates"],
            });
        },
        onError: err => {
            toast.error(err.message);
        },
    });

    const handleEditFlow = (newFlow: IAssessmentFlTempDto) => {
        if (newFlow.id && newFlow.organizationId)
            updateTemplateMutation.mutate({
                id: newFlow.id,
                organizationId: newFlow.organizationId,
                name: newFlow.name,
                content: newFlow.content,
            });
        else toast.error("Template id and orgId required!");
        setShowEditing(false);
    };

    const handleDeleteTemplate = async () => {
        await deleteTemplateMutation.mutateAsync(data.id!!);
    };

    return (
        <>
            <Portal>
                <DeleteModal
                    title="Delete template"
                    description="Are you sure you want to delete this assessment flow template? All of your data will be permanently removed. This action cannot be undone."
                    show={showDelete}
                    loading={deleteTemplateMutation.isPending}
                    onClose={() => setShowDelete(false)}
                    onConfirm={handleDeleteTemplate}
                />
            </Portal>
            <div className="px-4 py-6 bg-gray-100 flex items-center justify-between text-sm group">
                <div className="flex items-center gap-2 text-neutral-700">
                    <strong>{data.name}</strong>
                    &#8226;
                    <span>{data.assessments.length} stages</span>
                </div>
                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        type="button"
                        tabIndex={-1}
                        className="text-sm text-blue_primary_700 font-semibold hover:text-blue_primary_800 hover:underline"
                        onClick={() => {}}
                    >
                        Move
                    </button>
                    <button
                        type="button"
                        tabIndex={-1}
                        className="text-sm text-blue_primary_700 font-semibold hover:text-blue_primary_800 hover:underline"
                        onClick={() => setShowEditing(true)}
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        tabIndex={-1}
                        className="text-sm text-red-600 font-semibold hover:text-red-700 hover:underline"
                        onClick={() => setShowDelete(true)}
                    >
                        Delete
                    </button>
                </div>
            </div>
            <LazyMotion features={domAnimation}>
                <AnimatePresence>
                    {showEditing && (
                        <AssessmentFlowForm
                            data={data}
                            onSave={handleEditFlow}
                            onClose={() => setShowEditing(false)}
                        />
                    )}
                </AnimatePresence>
            </LazyMotion>
        </>
    );
};

export default CustomFlowCard;
