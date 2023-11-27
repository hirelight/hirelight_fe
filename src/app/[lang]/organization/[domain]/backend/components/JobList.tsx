"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import moment from "moment";

import jobServices from "@/services/job/job.service";
import { JobPostStatus } from "@/interfaces/job-post.interface";
import { IJobDto } from "@/services";
import { useAppSelector } from "@/redux/reduxHooks";
import { IResponse } from "@/interfaces/service.interface";

import HiringStageBar from "./HiringStageBar";
import JobCard from "./JobCard";
import JobListSkeleton from "./JobListSkeleton";

type JobListProps = {
    initialData?: IResponse<IJobDto[]>;
};

const JobList: React.FC<JobListProps> = ({ initialData }) => {
    const authUser = useAppSelector(state => state.auth.authUser);

    const {
        data: jobsRes,
        isLoading,
        isError,
        error,
        isSuccess,
    } = useQuery({
        queryKey: ["jobs", authUser?.organizationId],
        queryFn: () =>
            jobServices.getListAsync({
                OrganizationId: authUser?.organizationId,
            }),
        initialData: initialData,
    });
    const [selectedStatus, setSelectedStatus] = useState(JobPostStatus.DRAFT);

    return (
        <React.Fragment>
            <HiringStageBar
                jobList={jobsRes?.data ?? []}
                curStatus={selectedStatus}
                onChange={newStatus => setSelectedStatus(newStatus)}
            />
            {isLoading && <JobListSkeleton />}

            {isSuccess && (
                <ul className="space-y-6">
                    {jobsRes?.data
                        ?.filter(job =>
                            selectedStatus === JobPostStatus.INACTIVE
                                ? job.status === selectedStatus &&
                                  moment.utc(job.startTime).isAfter(moment())
                                : job.status === selectedStatus
                        )
                        .map(job => (
                            <li key={job.id}>
                                <JobCard data={job} />
                            </li>
                        ))}
                </ul>
            )}
        </React.Fragment>
    );
};

export default JobList;
