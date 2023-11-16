"use client";

import Link from "next/link";
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence } from "framer-motion";
import moment from "moment";
import Image from "next/image";

import { Button, ButtonOutline, Portal } from "@/components";
import { ApplicationFormJSON, IJobDto, JobContentJson } from "@/services";
import { IAppFormSection } from "@/interfaces";
import logo from "@/app/icon.svg";

import ApplyFormModal from "../ApplyFormModal/ApplyFormModal";

type JobDescriptionBesideProps = {
    data: Omit<IJobDto, "content" | "applicationForm"> & {
        content: JobContentJson;
        applicationForm: ApplicationFormJSON;
    };
    close: () => void;
};

const JobDescriptionBeside: React.FC<JobDescriptionBesideProps> = ({
    data,
    close,
}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="p-4 xl:px-6 transition-none bg-white relative">
                <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-500"
                    onClick={close}
                >
                    <XMarkIcon className="w-8 h-8" />
                </button>
                <div className="border-b border-gray-300 pb-6">
                    <div className="max-h-20 h-20 w-auto mb-3">
                        <Image
                            src={logo}
                            alt="Company logo"
                            width={80}
                            height={80}
                            className="h-full w-auto object-cover"
                        />
                    </div>
                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold mb-2">
                            {data.title}
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
                            {data.area}
                        </span>
                        <span className="mr-2 after:content-['\2022'] after:ml-2">
                            Company Industry
                        </span>
                        <span>{data.workModality}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                            Posted {moment(data.updatedTime).fromNow()}
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
                        <div
                            className="ql-editor !text-sm"
                            dangerouslySetInnerHTML={{
                                __html: data.content.description,
                            }}
                        ></div>
                    </section>
                    <section>
                        <h3 className="text-lg font-semibold mb-2">
                            Requirements
                        </h3>
                        <div
                            className="ql-editor !text-sm"
                            dangerouslySetInnerHTML={{
                                __html: data.content.requirements,
                            }}
                        ></div>
                    </section>
                    <section>
                        <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                        <div
                            className="ql-editor !text-sm"
                            dangerouslySetInnerHTML={{
                                __html: data.content.benefits,
                            }}
                        ></div>
                    </section>
                </div>
            </div>
            <Portal>
                <AnimatePresence>
                    {showModal && (
                        <ApplyFormModal
                            job={data}
                            close={() => setShowModal(false)}
                        />
                    )}
                </AnimatePresence>
            </Portal>
        </>
    );
};

export default JobDescriptionBeside;
