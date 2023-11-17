import Image from "next/image";
import React from "react";

import logo from "/public/images/logo.svg";

import Link from "next/link";

import { ICandidateAssessmentDetailDto } from "@/services";

type NotificationCardProps = {
    data: ICandidateAssessmentDetailDto;
};

const NotificationCard: React.FC<NotificationCardProps> = ({ data }) => {
    return (
        <Link
            href={`/assessment/${data.id}`}
            className="p-6 flex items-start gap-4 bg-white rounded-md drop-shadow-lg hover:bg-slate-100 cursor-pointer"
        >
            <Image alt="Company logo" src={logo} width={40} height={40} />
            <div>
                <h2 className="text-lg font-semibold mb-1">
                    {data.assessment.name}
                </h2>
                <p className="text-sm text-gray-500 mb-4">Company name</p>
                <div
                    className="text-neutral-700 text-sm ql-editor !p-0"
                    dangerouslySetInnerHTML={{
                        __html: data.assessment.description,
                    }}
                ></div>
            </div>
        </Link>
    );
};

export default NotificationCard;
