"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { FormEvent, Fragment, useEffect, useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

import { Button, ButtonOutline, CustomTextArea } from "@/components";
import { IReportContentJson } from "@/services/report/report.interface";
import reportServices from "@/services/report/report.service";
import { handleError } from "@/helpers";
import feedbackServices from "@/services/feedback/feedback.service";

type ReportModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    applicantProfileId: string;
};

const FeedbackModal: React.FC<ReportModalProps> = ({
    isOpen,
    closeModal,
    applicantProfileId,
}) => {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmitFeedback = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            const res = await feedbackServices.createReport({
                applicantProfileId: applicantProfileId,
                content,
            });
            toast.success(res.message);

            closeModal();
        } catch (error) {
            handleError(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        return () => {
            setContent("");
        };
    }, []);

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
                                    className="text-lg font-medium leading-6 p-6 border-b border-gray-300 text-gray-900"
                                >
                                    Give feedback
                                    <p className="font-light text-sm">
                                        What do you think about out process
                                    </p>
                                </Dialog.Title>
                                <form onSubmit={handleSubmitFeedback}>
                                    <div className="p-6">
                                        <CustomTextArea
                                            title="Do you have nay thoughts you'd like to share?"
                                            onChange={e =>
                                                setContent(e.target.value)
                                            }
                                            value={content}
                                            rows={6}
                                            required
                                        />
                                    </div>
                                    <div className="p-6 border-t border-gray-300 flex items-center justify-end gap-4">
                                        <Button
                                            type="submit"
                                            isLoading={loading}
                                            disabled={loading}
                                        >
                                            Send
                                        </Button>
                                        <ButtonOutline
                                            type="button"
                                            disabled={loading}
                                            onClick={closeModal}
                                            className="!border-gray-300 !text-neutral-500 hover:!text-neutral-700 hover:!bg-none"
                                        >
                                            Cancel
                                        </ButtonOutline>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default FeedbackModal;
