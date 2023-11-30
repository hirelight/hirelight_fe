"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import moment from "moment";

import meetingServices from "@/services/meeting/meeting.service";

import MeetingCard from "./MeetingCard";
import styles from "./MeetingCard.module.scss";

const MeetingSection = () => {
    const { assessmentId, candidateId } = useParams();

    const { data: meetingList, isLoading } = useQuery({
        queryKey: ["meeting-list", assessmentId, candidateId],
        queryFn: () =>
            meetingServices.getListByAssessmentId(assessmentId as string),
        select(data) {
            return {
                ...data,
                data: data.data.sort(function (a, b) {
                    return (
                        Math.abs(
                            Date.now() -
                                moment.utc(a.startTime).toDate().getTime()
                        ) -
                        Math.abs(
                            Date.now() -
                                moment.utc(b.startTime).toDate().getTime()
                        )
                    );
                }),
            };
        },
    });

    if (isLoading) return <MeetingSkeleton />;

    return (
        <div>
            <ul>
                {meetingList?.data?.map((meeting, meetingIndex) => (
                    <li
                        key={meetingIndex}
                        className="text-sm pb-6 border-b border-gray-300 pt-6 first:pt-0"
                    >
                        <MeetingCard data={meeting} />
                    </li>
                ))}
            </ul>

            <div className="px-6 py-4 flex justify-center items-center">
                <p className="text-sm text-gray-500">
                    No more activites to view
                </p>
            </div>
        </div>
    );
};

export default MeetingSection;

const MeetingSkeleton = () => {
    return (
        <div>
            <div className="flex items-center gap-2 animate-pulse">
                <div className="w-8 h-8 bg-slate-300 rounded-full"></div>
                <div className="flex-1">
                    <div className="h-6 w-80 bg-slate-200 rounded mb-1"></div>

                    <div className="h-5 w-32 bg-slate-200 rounded"></div>
                </div>
            </div>

            <div className={styles.content__wrapper}>
                {/* ************************************Meeting date section**************************************** */}
                <div className="h-5 w-11 bg-slate-200 rounded"></div>
                <div className="w-60 h-5 bg-slate-200 rounded"></div>

                {/* ************************************Meeting slot section**************************************** */}
                <div className="h-5 w-5 text-opacity-0 bg-slate-200 rounded"></div>
                <div className="w-60 h-5 bg-slate-200 rounded"></div>

                {/* ************************************Attendees Section**************************************** */}
                <div className="h-5 w-20 bg-slate-200"></div>
                <div className="flex gap-4 flex-wrap">
                    <div className="flex items-center gap-2 basis-56">
                        <div className="relative w-8 h-8 rounded-full bg-slate-300"></div>
                        <div className="flex-1">
                            <div className="whitespace-nowrap w-44 h-5 bg-slate-200 rounded mb-1"></div>

                            <div className="h-5 w-20 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                </div>

                {/* ************************************Meeting link section**************************************** */}
                <div className="h-5 w-24 bg-slate-200 rounded"></div>
                <div className="h-5 w-11 bg-slate-200 rounded"></div>

                {/* ************************************Meeting title section**************************************** */}
                <div className="h-5 w-9 bg-slate-200 rounded"></div>
                <div className="h-5 w-20 bg-slate-200 rounded"></div>

                {/* ************************************Meeting description section**************************************** */}
                <div className="h-5 w-16 bg-slate-200 rounded"></div>
                <div className="h-5 w-20 bg-slate-200 rounded"></div>

                <div className="h-5 w-14 bg-slate-200 rounded"></div>
                <div className="h-5 w-40 bg-slate-200 rounded"></div>
            </div>
        </div>
    );
};
