"use client";

import React from "react";
import { toast } from "react-toastify";

import { ButtonOutline, DeleteModal, Portal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { updateJob } from "@/redux/thunks/job.thunk";
import { JobPostStatus } from "@/interfaces/job-post.interface";
import jobServices from "@/services/job/job.service";

const AppFormFooter = () => {
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const job = useAppSelector(state => state.job.data);

    const handleShowConfirmModal = () => {
        setShowModal(true);
        // dispatch(clearAppForm);
    };

    const handleDeleteJob = async () => {
        if (job.status === JobPostStatus.ACTIVE) {
            return toast.error(
                `Job is publishing! Please unpublish job before detele`
            );
        }

        try {
            const res = await jobServices.deleteByIdAsync(job.id);
            toast.success(res.message);
        } catch (error: any) {
            toast.error(error.message ? error.message : "Something went wrong");
        }
    };

    const handleSaveDraft = async () => {
        setLoading(true);
        await dispatch(
            updateJob({
                ...job,
                id: job.id,
                content: JSON.stringify(job.content),
                applicationForm: JSON.stringify(job.applicationForm),
            })
        );
        setLoading(false);
    };

    return (
        <>
            <Portal>
                <DeleteModal
                    title="Delete job"
                    description="Are you sure you want to delete this job? All of your data will be permanently removed. This action cannot be undone."
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={handleDeleteJob}
                />
            </Portal>

            <div className="w-full bg-white flex items-center justify-between px-3 py-6 border-t border-gray-300 rounded-bl-lg rounded-br-lg relative z-[2]">
                <ButtonOutline
                    className={loading ? `bg-blue_primary_800 text-white` : ""}
                    onClick={handleSaveDraft}
                    disabled={loading}
                    isLoading={loading}
                >
                    Save draft
                </ButtonOutline>
                <button
                    type="button"
                    className="text-xs font-medium text-red-600 hover:text-red-800 hover:font-semibold hover:underline"
                    onClick={handleShowConfirmModal}
                >
                    Delete job
                </button>
            </div>
        </>
    );
};

export default AppFormFooter;
