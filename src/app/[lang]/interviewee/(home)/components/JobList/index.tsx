"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import { Pagination } from "@/components";
import jobServices from "@/services/job/job.service";
import { IJobDto } from "@/services";

import JobCard from "./JobCard";
import JobDescriptionBeside from "./JobDescriptionBeside";
import JobListHeader from "./JobListHeader";

const JobList = () => {
    const [showJD, setShowJD] = useState(false);
    const [selectedJob, setSelectedJob] = useState<IJobDto>();
    const [searchString, setSearchString] = useState("");
    const [curPage, setCurPage] = useState(0);

    const { data: jobsRes } = useQuery({
        queryKey: ["jobs"],
        queryFn: () => jobServices.getListByGuestAsync(),
    });

    return (
        <>
            <JobListHeader
                searchString={searchString}
                onChange={value => {
                    setSearchString(value);
                    setCurPage(0);
                }}
            />
            <div className="max-w-screen-xl mx-auto px-4 md:px-10 flex flex-col lg:flex-row gap-6 py-6 relative">
                <div className="flex-1 md:px-8 md:py-6 max-w-full bg-white rounded-lg shadow-lg border border-slate-200">
                    <div className="flex w-full items-start">
                        <div className="w-full max-w-full overflow-hidden">
                            <div className="w-full flex justify-between">
                                <h3 className="text-neutral-700 font-semibold text-xl mb-6">
                                    {jobsRes?.data?.filter(
                                        job =>
                                            job.title
                                                .toLowerCase()
                                                .includes(searchString) ||
                                            (job.keywords &&
                                                job.keywords
                                                    .split(",")
                                                    .some(item =>
                                                        searchString
                                                            .toLowerCase()
                                                            .includes(
                                                                item.toLowerCase()
                                                            )
                                                    ))
                                    ).length ?? 0}{" "}
                                    jobs associated
                                </h3>
                            </div>

                            <div>
                                <ul className="flex flex-col gap-3">
                                    {jobsRes &&
                                        jobsRes.data &&
                                        jobsRes.data
                                            .filter(
                                                job =>
                                                    job.title
                                                        .toLowerCase()
                                                        .includes(
                                                            searchString
                                                        ) ||
                                                    (job.keywords &&
                                                        job.keywords
                                                            .split(",")
                                                            .some(item =>
                                                                searchString
                                                                    .toLowerCase()
                                                                    .includes(
                                                                        item.toLowerCase()
                                                                    )
                                                            ))
                                            )
                                            .slice(curPage * 10, curPage + 10)
                                            .sort((a, b) =>
                                                new Date(
                                                    a.updatedTime
                                                ).getTime() <
                                                new Date(
                                                    b.updatedTime
                                                ).getTime()
                                                    ? 1
                                                    : -1
                                            )
                                            .map((job, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => {
                                                        setShowJD(true);
                                                        setSelectedJob(job);
                                                    }}
                                                >
                                                    <JobCard
                                                        data={
                                                            {
                                                                ...job,
                                                                content:
                                                                    JSON.parse(
                                                                        job.content
                                                                    ),
                                                                applicationForm:
                                                                    JSON.parse(
                                                                        job.applicationForm
                                                                    ),
                                                            } as any
                                                        }
                                                    />
                                                </li>
                                            ))}
                                </ul>
                            </div>
                        </div>

                        <AnimatePresence>
                            {showJD && selectedJob && (
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: "100%",
                                        transition: {
                                            duration: 0.4,
                                        },
                                    }}
                                    exit={{
                                        width: 0,
                                        transition: {
                                            duration: 0.4,
                                        },
                                    }}
                                    className="flex-shrink-0 absolute md:sticky lg:max-w-[45%] w-full max-h-screen h-fit top-0 md:right-0 overflow-hidden overflow-y-auto"
                                >
                                    <JobDescriptionBeside
                                        data={
                                            {
                                                ...selectedJob,
                                                content: JSON.parse(
                                                    selectedJob.content
                                                ),
                                                applicationForm: JSON.parse(
                                                    selectedJob.applicationForm
                                                ),
                                            } as any
                                        }
                                        close={() => setShowJD(false)}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {jobsRes &&
                        jobsRes.data &&
                        jobsRes.data.filter(
                            job =>
                                job.title
                                    .toLowerCase()
                                    .includes(searchString) ||
                                (job.keywords &&
                                    job.keywords
                                        .split(",")
                                        .some(item =>
                                            searchString
                                                .toLowerCase()
                                                .includes(item.toLowerCase())
                                        ))
                        ).length > 10 && (
                            <div className="flex justify-center items-center mt-6">
                                <Pagination
                                    numOfPages={Math.floor(
                                        jobsRes.data.filter(
                                            job =>
                                                job.title
                                                    .toLowerCase()
                                                    .includes(searchString) ||
                                                (job.keywords &&
                                                    job.keywords
                                                        .split(",")
                                                        .some(item =>
                                                            searchString
                                                                .toLowerCase()
                                                                .includes(
                                                                    item.toLowerCase()
                                                                )
                                                        ))
                                        ).length / 10
                                    )}
                                    onChangePage={page => setCurPage(page)}
                                />
                            </div>
                        )}
                </div>
            </div>
        </>
    );
};

export default JobList;
