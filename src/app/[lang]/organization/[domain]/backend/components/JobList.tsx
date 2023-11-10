"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

import jobServices from "@/services/job/job.service";
import { JobPostStatus } from "@/interfaces/job-post.interface";
import { useUserInfo } from "@/hooks/useUserInfo";
import { IUserDto } from "@/services";

import HiringStageBar from "./HiringStageBar";
import JobCard from "./JobCard";

const JobList = () => {
    const userData = useUserInfo<IUserDto>();
    const { data: jobsRes } = useQuery({
        queryKey: ["jobs"],
        queryFn: () => jobServices.getListAsync(userData!!.organizationId),
    });
    const [selectedStatus, setSelectedStatus] = useState(JobPostStatus.DRAFT);

    return (
        <React.Fragment>
            <HiringStageBar
                jobList={jobsRes?.data ?? []}
                curStatus={selectedStatus}
                onChange={newStatus => setSelectedStatus(newStatus)}
            />
            <ul className="space-y-6">
                {jobsRes?.data
                    ?.filter(job => job.status === selectedStatus)
                    .map(job => (
                        <li key={job.id}>
                            <JobCard data={job} />
                        </li>
                    ))}
            </ul>
        </React.Fragment>
    );
};

export default JobList;
