"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

import activityServices from "@/services/activity/activity.service";
import { getImageNode } from "@/helpers/getIconBaseType";

const JobActivites = () => {
    const { jobId } = useParams();
    const { data: activityRes } = useQuery({
        queryKey: ["activities", jobId],
        queryFn: () => activityServices.getListByJobId(jobId as string),
    });

    console.log(activityRes);

    return (
        <div className="bg-white p-6 rounded-md drop-shadow-lg">
            {/* <ul>
                {activityRes?.data.map(activity => (
                    <li
                        key={activity.id}
                        className="pb-4 border-b border-gray-300 last:border-b-none"
                    >
                        <div className="float-left">
                            <strong>
                                {`${
                                    activity.collaborator.employerDto
                                        .firstName ?? ""
                                }  ${
                                    activity.collaborator.employerDto
                                        .lastName ?? ""
                                }`}
                            </strong>
                        </div>
                        <div className="w-1/3 pl-2 float-left">
                            <div className="w-7.5 h-7.5 float-left">
                                {getImageNode(
                                    activity.collaborator.employerDto.avatarUrl
                                )}
                            </div>
                            <p>
                                {`${
                                    activity.collaborator.employerDto
                                        .firstName ?? ""
                                }  ${
                                    activity.collaborator.employerDto
                                        .lastName ?? ""
                                }`}
                            </p>
                            <p>{activity.collaborator.employerDto.email}</p>
                        </div>
                    </li>
                ))}
            </ul> */}
        </div>
    );
};

export default JobActivites;
