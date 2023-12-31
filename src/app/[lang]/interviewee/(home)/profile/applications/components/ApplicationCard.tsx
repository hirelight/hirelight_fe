"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import moment from "moment";
import { useParams } from "next/navigation";

import { Calendar, Clock, DollarCurrency, MapPin } from "@/icons";

import logo from "/public/images/logo.svg";

import { IApplicantProfileDto } from "@/services";
import { ButtonOutline } from "@/components";

interface ApplicationCardProps {
    data: IApplicantProfileDto;
    onSelect: (applicantProfileId: string) => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
    data,
    onSelect,
}) => {
    const { lang } = useParams();
    return (
        <div className="flex gap-4 p-4 sm:p-6 bg-white border border-gray-200 rounded-md shadow">
            <div className="hidden md:block rounded-full w-20 h-20 border border-slate-200 overflow-hidden">
                <Image
                    alt="Company Logo"
                    src={data.jobPost.organization?.logoUrl ?? logo}
                    width={72}
                    height={72}
                    className="w-full h-auto object-contain"
                />
            </div>

            <div className="flex-1">
                <h4 className="text-neutral-700 font-medium text-sm sm:text-base">
                    {data.jobPost.organization.name}
                </h4>
                <h3 className="text-neutral-700 text-lg sm:text-2xl font-semibold mt-1 mb-2">
                    {data.jobPost.title}
                </h3>

                <div className="flex flex-col md:flex-row flex-wrap gap-3 md:gap-6 text-neutral-500 mb-4">
                    <div className="flex items-center">
                        <MapPin className="w-4 h-4 inline-block mr-1" />
                        <span className="text-xs sm:text-sm whitespace-nowrap">
                            {data.jobPost.area}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 inline-block mr-1" />
                        <span className="text-xs sm:text-sm whitespace-nowrap">
                            {data.jobPost.workModality}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <DollarCurrency className="w-4 h-4 inline-block mr-1" />
                        <span className="text-xs sm:text-sm whitespace-nowrap">
                            {!data.jobPost.maxSalary && !data.jobPost.maxSalary
                                ? "Negotiate"
                                : data.jobPost.minSalary +
                                  "-" +
                                  data.jobPost.maxSalary}
                        </span>
                    </div>
                    <div className="hidden xl:flex items-center">
                        <Calendar className="w-4 h-4 inline-block mr-1" />
                        <span className="text-xs sm:text-sm whitespace-nowrap">
                            {moment
                                .utc(data.jobPost.updatedTime)
                                .locale(lang)
                                .fromNow()}
                        </span>
                    </div>
                </div>
                <div className="space-x-4">
                    <Link
                        href={`applications/${data.jobPost.id}/notifications`}
                        className="inline-block text-blue-700 hover:text-white border border-blue_primary_800 hover:bg-blue_primary_800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-2 text-center mt-4 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                    >
                        View progress
                    </Link>
                    <button
                        type="button"
                        className="inline-block text-blue-700 hover:text-white border border-blue_primary_800 hover:bg-blue_primary_800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-2 text-center mt-4 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                        onClick={() => onSelect(data.id)}
                    >
                        Feedback
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplicationCard;
