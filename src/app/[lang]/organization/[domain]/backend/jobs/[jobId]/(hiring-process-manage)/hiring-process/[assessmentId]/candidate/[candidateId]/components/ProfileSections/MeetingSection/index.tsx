"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import moment from "moment";

import meetingServices from "@/services/meeting/meeting.service";

import MeetingCard from "./MeetingCard";

const MeetingSection = () => {
    const { assessmentId, candidateId } = useParams();

    const { data: meetingList } = useQuery({
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
