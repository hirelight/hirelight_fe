"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import { Pagination } from "@/components";
import jobServices from "@/services/job/job.service";
import { IJobDto } from "@/services";

import JobCard from "./JobCard";
import JobDescriptionBeside from "./JobDescriptionBeside";
import JobsCenterCategory from "./JobsCenterCategory";

const JobList = () => {
    const [showJD, setShowJD] = useState(false);
    const [selectedJob, setSelectedJob] = useState<IJobDto>();

    const { data: jobsRes } = useQuery({
        queryKey: ["jobs-candidate"],
        queryFn: () => jobServices.getListAsync(),
    });
    return (
        <>
            {/* <JobsCenterCategory /> */}
            <div className="flex-1 px-8 py-6 bg-white rounded-lg shadow-lg border border-slate-200">
                <div className="flex justify-between">
                    <div className="w-full">
                        <div className="w-full flex justify-between">
                            <h3 className="text-neutral-700 font-semibold text-xl mb-6">
                                20 jobs associated
                            </h3>
                        </div>

                        <div>
                            <ul className="flex flex-col gap-3">
                                {jobsRes?.data?.map((job, index) => (
                                    <li
                                        key={index}
                                        onClick={() => {
                                            setShowJD(true);
                                            setSelectedJob(job);
                                        }}
                                    >
                                        <JobCard
                                            data={{
                                                ...job,
                                                content: JSON.parse(
                                                    job.content
                                                ),
                                                applicationForm: JSON.parse(
                                                    job.applicationForm
                                                ),
                                            }}
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
                                className="max-w-[45%] w-full max-h-screen h-fit sticky top-0 overflow-hidden overflow-y-auto"
                            >
                                <JobDescriptionBeside
                                    data={{
                                        ...selectedJob,
                                        content: JSON.parse(
                                            selectedJob.content
                                        ),
                                        applicationForm: JSON.parse(
                                            selectedJob.applicationForm
                                        ),
                                    }}
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
