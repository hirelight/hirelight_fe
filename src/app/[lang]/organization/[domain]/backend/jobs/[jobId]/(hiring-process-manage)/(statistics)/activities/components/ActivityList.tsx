"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

import activityServices from "@/services/activity/activity.service";

import ActivityCard from "./ActivityCard";

const ActivityList = () => {
    const { jobId } = useParams();
    const { data: activityRes, isLoading } = useQuery({
        queryKey: ["activities", jobId],
        queryFn: () => activityServices.getListByJobId(jobId as string),
    });

    if (isLoading) return <ActivityListSkeleton />;

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

const ActivityListSkeleton = () => {
    return (
        <ul>
            {new Array(6).fill("").map((_, index) => (
                <li
                    key={index}
                    className="py-4 first:pt-0 border-b border-gray-300 last:border-b-0"
                >
                    <div className="flex animate-pulse">
                        <div className="w-2/3">
                            <div className="w-80 h-5 rounded bg-slate-300"></div>
                        </div>
                        <div className="w-1/3 pl-2 flex items-center">
                            <div className="w-8 h-8 rounded-full bg-slate-300 mr-2"></div>
                            <div>
                                <p className="h-5 w-32 rounded bg-slate-200 mb-2"></p>
                                <p className="w-40 h-5 rounded bg-slate-200"></p>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};
