"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

import activityServices from "@/services/activity/activity.service";

import ActivityCard from "./ActivityCard";

const ActivityList = () => {
    const { jobId } = useParams();
    const { data: activityRes } = useQuery({
        queryKey: ["activities", jobId],
        queryFn: () => activityServices.getListByJobId(jobId as string),
    });

    return (
        <ul>
            {activityRes?.data.map(activity => (
                <li
                    key={activity.id}
                    className="py-4 first:pt-0 border-b border-gray-300 last:border-b-0"
                >
                    <ActivityCard data={activity} />
                </li>
            ))}
        </ul>
    );
};

export default ActivityList;
