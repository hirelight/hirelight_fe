"use client";

import Link from "next/link";
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence } from "framer-motion";
import moment from "moment";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { FlagIcon } from "@heroicons/react/24/outline";

import { Button, ButtonOutline, Portal } from "@/components";
import {
    ApplicationFormJSON,
    IJobDto,
    IOrganizationDto,
    JobContentJson,
} from "@/services";
import logo from "@/app/icon.svg";
import { decryptData } from "@/helpers/authHelpers";
import { sanitizeHtml } from "@/helpers/sanitizeHTML";

import ApplyFormModal from "../ApplyFormModal/ApplyFormModal";

import ReportModal from "./ReportModal";

type JobDescriptionBesideProps = {
    data: Omit<IJobDto, "content" | "applicationForm"> & {
        content: JobContentJson;
        applicationForm: ApplicationFormJSON;
        organization: IOrganizationDto;
    };
    close: () => void;
};

const JobDescriptionBeside: React.FC<JobDescriptionBesideProps> = ({
    data,
    close,
}) => {
    const router = useRouter();
    const { lang } = useParams();
    const token = decryptData("hirelight_access_token");

    const [showModal, setShowModal] = useState(false);
    const [showReport, setShowReport] = useState(false);

    const handleShowReportForm = () => {
        if (!token) return router.push(`/${lang}/login`);

        setShowReport(true);
    };

    return (
        <>
            <ReportModal
                isOpen={showReport}
                jobPostId={data.id}
                closeModal={() => setShowReport(false)}
            />
            <div className="p-4 xl:px-6 transition-none bg-white relative">
                <div className="absolute top-4 right-4 flex gap-4">
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-800"
                        onClick={handleShowReportForm}
                    >
                        <FlagIcon className="w-6 h-6" />
                    </button>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-800"
                        onClick={close}
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="border-b border-gray-300 pb-6">
                    <div className="max-h-20 h-20 w-auto mb-3">
                        <Image
                            src={data.organization.logoUrl ?? logo}
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
                                {data.organization.name}
                            </Link>
                        </p>
                    </div>
                    <div className="mb-6">
                        <span className="mr-2 after:content-['\2022'] after:ml-2">
                            {data.area}
                        </span>
                        {data.organization.industry && (
                            <span className="mr-2 after:content-['\2022'] after:ml-2">
                                {data.organization.industry}
                            </span>
                        )}
                        {data.workModality && <span>{data.workModality}</span>}
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                            Posted{" "}
                            {moment(data.updatedTime).locale(lang).fromNow()}
                        </span>
                        <div className="flex items-center gap-1">
                            <ButtonOutline>Share job</ButtonOutline>
                            <Button
                                onClick={() => {
                                    if (!token)
                                        return router.push(`/${lang}/login`);
                                    setShowModal(true);
                                }}
                            >
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
                                __html: sanitizeHtml(data.content.description),
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
                                __html: sanitizeHtml(data.content.requirements),
                            }}
                        ></div>
                    </section>
                    <section>
                        <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                        <div
                            className="ql-editor !text-sm"
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHtml(data.content.benefits),
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
