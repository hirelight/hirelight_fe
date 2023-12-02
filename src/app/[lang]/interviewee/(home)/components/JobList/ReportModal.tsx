"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { FormEvent, Fragment, useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

import { Button, ButtonOutline, CustomTextArea } from "@/components";
import { IReportContentJson } from "@/services/report/report.interface";
import reportServices from "@/services/report/report.service";
import { handleError } from "@/helpers";

type ReportModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    jobPostId: string;
};

const reportTypes = [
    { type: "scam", detail: "I think it's a spam or a scam" },
    { type: "offensive", detail: "I think it's discriminatory or offensive" },
    { type: "incorrect", detail: "I think something is broken  or incorrect" },
];

const ReportModal: React.FC<ReportModalProps> = ({
    isOpen,
    closeModal,
    jobPostId,
}) => {
    const [formState, setFormState] = useState<IReportContentJson>({
        type: "",
        content: "",
    });
    const [loading, setLoading] = useState(false);

    const handleSubmitReport = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            const res = await reportServices.createReport({
                jobPostId: jobPostId,
                content: JSON.stringify(formState),
            });
            toast.success(res.message);
        } catch (error) {
            handleError(error);
        }
        setLoading(false);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden !p-0 rounded-md bg-white text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 p-6 border-b border-gray-400 text-gray-900"
                                >
                                    {!formState.type
                                        ? "Why are you reporting this?"
                                        : "Tell us a little more"}
                                </Dialog.Title>
                                {!formState.type ? (
                                    <ul>
                                        {reportTypes.map((type, index) => (
                                            <li
                                                key={type.type}
                                                className="border-b border-gray-300 px-2 "
                                            >
                                                <button
                                                    type="button"
                                                    className="w-full px-2 py-4 hover:bg-gray-100 rounded text-left relative"
                                                    onClick={() =>
                                                        setFormState({
                                                            ...formState,
                                                            type: type.type,
                                                        })
                                                    }
                                                >
                                                    <p>{type.detail}</p>

                                                    <div className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2">
                                                        <ArrowRightIcon />
                                                    </div>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <form onSubmit={handleSubmitReport}>
                                        <div className="p-6">
                                            <CustomTextArea
                                                title=""
                                                onChange={e =>
                                                    setFormState({
                                                        ...formState,
                                                        content: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="p-6 border-t border-gray-300 flex items-center justify-end gap-4">
                                            <ButtonOutline
                                                type="button"
                                                disabled={loading}
                                                onClick={() =>
                                                    setFormState({
                                                        type: "",
                                                        content: "",
                                                    })
                                                }
                                            >
                                                Back
                                            </ButtonOutline>
                                            <Button
                                                type="submit"
                                                isLoading={loading}
                                                disabled={loading}
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ReportModal;
