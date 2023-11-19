"use client";

import Image from "next/image";
import React from "react";

import logo from "/public/images/logo.svg";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ICandidateAssessmentDetailDto } from "@/services";
import { ApplicantAssessmentDetailStatus } from "@/interfaces/assessment.interface";
import { ButtonOutline } from "@/components";

type NotificationCardProps = {
    data: ICandidateAssessmentDetailDto;
};

const NotificationCard: React.FC<NotificationCardProps> = ({ data }) => {
    const router = useRouter();

    const getStatusBadge = (status: ApplicantAssessmentDetailStatus) => {
        switch (status) {
            case ApplicantAssessmentDetailStatus.INVITED:
                return (
                    <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        Available
                    </span>
                );
            case ApplicantAssessmentDetailStatus.MOVED ||
                ApplicantAssessmentDetailStatus.NON_ATTENDANCE:
                return (
                    <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                        End
                    </span>
                );
            case ApplicantAssessmentDetailStatus.PENDING_EVALUATION:
                return (
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                        Processing
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-6 flex items-start gap-4 bg-white rounded-md drop-shadow-lg hover:bg-slate-100 cursor-pointer">
            <Image alt="Company logo" src={logo} width={40} height={40} />
            <div>
                <h2 className="text-lg font-semibold mb-1">
                    {data.assessment.name}
                    <span className="ml-4">{getStatusBadge(data.status)}</span>
                </h2>
                <p className="text-sm text-gray-500 mb-4">Company name</p>
                <div
                    className="text-neutral-700 text-sm ql-editor !p-0"
                    dangerouslySetInnerHTML={{
                        __html: data.assessment.description,
                    }}
                ></div>

                <ButtonOutline
                    onClick={() => router.push(`/assessment/${data.id}`)}
                    className="mt-4 !rounded-full"
                >
                    Take test
                </ButtonOutline>
            </div>
        </div>
    );
};

export default NotificationCard;
