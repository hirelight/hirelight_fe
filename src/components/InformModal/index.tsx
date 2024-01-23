"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { Button } from "..";

type InformModalProps = {};

const InformModal: React.FC<InformModalProps> = () => {
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
                                    Try out information
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-base text-gray-600">
                                        <span>
                                            <b>Hirelight</b> is now deploying
                                            using{" "}
                                            <b>
                                                Azure Cloud Services free tier
                                            </b>
                                            .
                                            <br /> The application might
                                            encounter time out issue on server
                                            due to Azure free tier service will
                                            stop{" "}
                                            <b>
                                                after a period of time without
                                                any users access to the
                                                application
                                            </b>
                                            .<br />
                                            Please retry serveral time so that
                                            the server can start for services.
                                        </span>
                                    </p>
                                </div>

                                <div className="mt-4 text-right">
                                    <Button
                                        type="button"
                                        onClick={handleCloseModal}
                                    >
                                        Close
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
