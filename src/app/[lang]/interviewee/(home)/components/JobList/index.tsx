"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import { Pagination } from "@/components";
import jobServices from "@/services/job/job.service";
import { IJobDto } from "@/services";

import { useJobsCenter } from "../../page";

import JobCard from "./JobCard";
import JobDescriptionBeside from "./JobDescriptionBeside";
import JobsCenterCategory from "./JobsCenterCategory";

const JobList = () => {
    const [showJD, setShowJD] = useState(false);
    const [selectedJob, setSelectedJob] = useState<IJobDto>();
    const { searchString } = useJobsCenter();

    const { data: jobsRes } = useQuery({
        queryKey: ["jobs-candidate"],
        queryFn: jobServices.getListAsync,
    });
    return (
        <>
            {/* <JobsCenterCategory /> */}
            <div className="flex-1 md:px-8 md:py-6 max-w-full bg-white rounded-lg shadow-lg border border-slate-200">
                <div className="flex w-full items-start">
                    <div className="w-full max-w-full overflow-hidden">
                        <div className="w-full flex justify-between">
                            <h3 className="text-neutral-700 font-semibold text-xl mb-6">
                                {
                                    jobsRes?.data.filter(job =>
                                        job.title
                                            .toLowerCase()
                                            .includes(searchString)
                                    ).length
                                }{" "}
                                jobs associated
                            </h3>
                        </div>

                        <div>
                            <ul className="flex flex-col gap-3">
                                {jobsRes?.data
                                    .filter(job =>
                                        job.title
                                            .toLowerCase()
                                            .includes(searchString)
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
                                                        content: JSON.parse(
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

                {jobsRes && jobsRes?.data.length > 10 && (
                    <div className="flex justify-center items-center mt-6">
                        <Pagination numOfPages={5} />
                    </div>
                )}
            </div>
        </>
    );
};

export default JobList;
