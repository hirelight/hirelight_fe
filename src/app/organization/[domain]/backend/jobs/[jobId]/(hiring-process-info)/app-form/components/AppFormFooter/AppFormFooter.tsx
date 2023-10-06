"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { ButtonOutline, DeleteModal, Portal } from "@/components";
import { useAppDispatch } from "@/redux/reduxHooks";
import { clearAppForm } from "@/redux/slices/app-form.slice";
import { SpinLoading } from "@/icons";
import { delayFunc } from "@/helpers/shareHelpers";

const AppFormFooter = () => {
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const { jobId } = useParams();
    const router = useRouter();

    const handleShowConfirmModal = () => {
        setShowModal(true);
        // dispatch(clearAppForm);
    };

    const handleSaveDraft = async () => {
        setLoading(true);
        await delayFunc(2000);
        setLoading(false);
        toast.success("Update application form success");
    };

    return (
        <>
            <Portal>
                <DeleteModal
                    title="Delete job"
                    description="Are you sure you want to delete this job? All of your data will be permanently removed. This action cannot be undone."
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={() => console.log("Delete job")}
                />
            </Portal>

            <div className="w-full bg-white flex items-center justify-between px-3 py-6 border-t border-gray-300 rounded-bl-lg rounded-br-lg relative z-[2]">
                <ButtonOutline
                    className={loading ? `bg-blue_primary_800 text-white` : ""}
                    onClick={handleSaveDraft}
                >
                    Save draft {loading && <SpinLoading className="ml-1" />}
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
