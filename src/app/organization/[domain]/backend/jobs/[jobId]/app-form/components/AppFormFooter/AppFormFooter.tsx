"use client";

import React from "react";

import { ButtonOutline, DeleteModal, Portal } from "@/components";
import { useAppDispatch } from "@/redux/reduxHooks";
import { clearAppForm } from "@/redux/slices/app-form.slice";
import { SpinLoading } from "@/icons";

const AppFormFooter = () => {
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = React.useState(false);

    const handleShowConfirmModal = () => {
        setShowModal(true);
        // dispatch(clearAppForm);
    };

    return (
        <>
            <Portal>
                <DeleteModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={() => console.log("Delete job")}
                />
            </Portal>

            <div className="w-full bg-white flex items-center justify-between px-3 py-6 border-t border-gray-300 rounded-bl-lg rounded-br-lg relative z-[2]">
                <ButtonOutline>Save draft</ButtonOutline>
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
