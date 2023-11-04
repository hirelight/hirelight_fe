"use client";

import Link from "next/link";
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence } from "framer-motion";

import { Button, ButtonOutline, Portal } from "@/components";

import ApplyFormModal from "./ApplyFormModal/ApplyFormModal";

type JobDescriptionBesideProps = {
    close: () => void;
};

const JobDescriptionBeside: React.FC<JobDescriptionBesideProps> = ({
    close,
}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="p-4 xl:px-6 transition-none relative">
                <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-600"
                    onClick={close}
                >
                    <XMarkIcon className="w-6 h-6" />
                </button>
                <div className="border-b border-gray-300 pb-6">
                    <div className="max-h-20 h-20 w-auto bg-slate-200">
                        Logo
                    </div>
                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold mb-2">
                            Job Title
                        </h2>
                        <p>
                            at{" "}
                            <Link
                                href="#"
                                className="text-blue_primary_600 hover:underline hover:text-blue_primary_700 cursor-pointer"
                            >
                                Company name
                            </Link>
                        </p>
                    </div>
                    <div className="mb-6">
                        <span className="mr-2 after:content-['\2022'] after:ml-2">
                            Company Area
                        </span>
                        <span className="mr-2 after:content-['\2022'] after:ml-2">
                            Company Industry
                        </span>
                        <span>Work modality</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                            Posted 1 day ago
                        </span>
                        <div className="flex items-center gap-1">
                            <ButtonOutline>Share job</ButtonOutline>
                            <Button onClick={() => setShowModal(true)}>
                                Apply now
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="pt-6 text-neutral-700 space-y-4">
                    <section>
                        <h3 className="text-lg font-semibold mb-2">
                            Description
                        </h3>
                        <div className="text-sm">
                            <p>
                                Are you looking for an opportunity to make an
                                impact, grow your skills and catapult your
                                career with a growing company? MealSuite is
                                looking for Backend Developers to join our
                                development team on our mission to revolutionize
                                the continuum of care through our all-in-one
                                foodservice management technology.
                            </p>
                        </div>
                    </section>
                    <section>
                        <h3 className="text-lg font-semibold mb-2">
                            Requirements
                        </h3>
                        <div className="text-sm">
                            <p>
                                Are you looking for an opportunity to make an
                                impact, grow your skills and catapult your
                                career with a growing company? MealSuite is
                                looking for Backend Developers to join our
                                development team on our mission to revolutionize
                                the continuum of care through our all-in-one
                                foodservice management technology.
                            </p>
                        </div>
                    </section>
                    <section>
                        <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                        <div className="text-sm">
                            <p>
                                Are you looking for an opportunity to make an
                                impact, grow your skills and catapult your
                                career with a growing company? MealSuite is
                                looking for Backend Developers to join our
                                development team on our mission to revolutionize
                                the continuum of care through our all-in-one
                                foodservice management technology.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
            <Portal>
                <AnimatePresence>
                    {showModal && (
                        <ApplyFormModal close={() => setShowModal(false)} />
                    )}
                </AnimatePresence>
            </Portal>
        </>
    );
};

export default JobDescriptionBeside;
