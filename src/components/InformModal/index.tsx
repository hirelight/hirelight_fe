"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useParams } from "next/navigation";

import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import { Button } from "..";

type InformModalProps = {
    title?: string;
    content?: string | React.ReactNode;
};

const InformModal: React.FC<InformModalProps> = ({ title, content }) => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale);
    const [isOpen, setIsOpen] = useState(true);

    const handleCloseModal = async () => {
        setIsOpen(false);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={handleCloseModal}
            >
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
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md md:max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-xl font-medium leading-6 text-gray-900"
                                >
                                    {title ?? t("common:information")}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-base text-gray-600">
                                        {content ??
                                            `Your payment has been successfully
                                        submitted. We’ve sent you an email with
                                        all of the details of your order.`}
                                    </p>
                                </div>

                                <div className="mt-4 text-right">
                                    <Button
                                        type="button"
                                        onClick={handleCloseModal}
                                    >
                                        {t("common:confirm")}
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default InformModal;
