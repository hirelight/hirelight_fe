"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import Image from "next/image";

import logo from "/public/images/logo.svg";

import Link from "next/link";
import { useParams } from "next/navigation";
import moment from "moment";

import meetingServices from "@/services/meeting/meeting.service";
import { useAppSelector } from "@/redux/reduxHooks";

const MeetingList = () => {
    const { lang } = useParams();
    const { authUser } = useAppSelector(state => state.auth);
    const { data: meetings } = useQuery({
        queryKey: ["meetings"],
        queryFn: () =>
            meetingServices.getListByAssessmentId(undefined, authUser?.userId),
    });

    return (
        <div className="space-y-6">
            {meetings?.data.map(meeting => (
                <div
                    key={meeting.id}
                    className="flex items-center gap-4 p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow"
                >
                    <div className="hidden md:block rounded-full w-20 h-20 border border-slate-200 overflow-hidden">
                        <Image
                            alt="Company Logo"
                            src={logo}
                            width={72}
                            height={72}
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    <div className="flex-1">
                        <h4 className="text-neutral-700 font-medium text-2xl mb-3">
                            {meeting.name}
                        </h4>

                        <div className="flex flex-col flex-wrap gap-1 text-neutral-500">
                            <div className="flex items-center">
                                <span className="text-xs sm:text-sm whitespace-nowrap">
                                    From:{" "}
                                    <strong>
                                        {moment
                                            .utc(meeting.startTime)
                                            .local()
                                            .locale(lang)
                                            .format("dddd MMMM Do HH:mm A")}
                                    </strong>
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-xs sm:text-sm whitespace-nowrap">
                                    To:{" "}
                                    <strong>
                                        {moment
                                            .utc(meeting.endTime)
                                            .local()
                                            .locale(lang)
                                            .format("dddd MMMM Do HH:mm A")}
                                    </strong>
                                </span>
                            </div>
                        </div>
                    </div>
                    <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`/${lang}/events/${meeting.id}`}
                        className="inline-block text-blue-700 hover:text-white border border-blue_primary_800 hover:bg-blue_primary_800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-2 text-center mt-4 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                    >
                        View detail
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default MeetingList;
