"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { EllipsisVertical } from "@/icons";
import { IJobDto } from "@/services/job/job.interface";

interface IStage {
    name: string;
    numOfCandidate: number;
}

const arrs: IStage[] = [
    {
        numOfCandidate: 0,
        name: "Inbox",
    },
    {
        numOfCandidate: 0,
        name: "Review CV",
    },
    {
        numOfCandidate: 0,
        name: "Phone Screen",
    },
    {
        numOfCandidate: 0,
        name: "Assessment",
    },
    {
        numOfCandidate: 0,
        name: "Interview",
    },
    {
        numOfCandidate: 0,
        name: "Offer",
    },
];

interface JobCardProps {
    data: IJobDto;
}

const JobCard: React.FC<JobCardProps> = ({
    data: { title, area, status, id },
}) => {
    const router = useRouter();

    return (
        <div className="w-full p-6 bg-white shadow-md rounded-lg">
            <div className="w-full flex  items-center justify-between mb-6">
                <div className="flex  flex-wrap sm:flex-nowrap items-start sm:items-center sm:flex-row gap-3">
                    <Link
                        href={`backend/jobs/${id}/hiring-process/applied`}
                        className="text-blue_primary_700 text-xl font-medium whitespace-nowrap hover:underline"
                    >
                        {title}
                    </Link>
                    <span className="text-sm text-neutral-500 whitespace-nowrap">
                        {area}
                    </span>
                </div>
                <div className="flex gap-4 items-center">
                    <button
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 hidden md:block"
                    >
                        Publish
                    </button>
                    <button
                        type="button"
                        className="group"
                        onClick={() => router.push(`backend/jobs/${id}/edit`)}
                    >
                        <EllipsisVertical className="w-5 h-5 group-hover:w-6 group-hover:h-6 transition-all" />
                    </button>
                </div>
            </div>
            <div className="hidden md:grid grid-cols-6 mt-2 mb-6">
                {arrs.map((item, index) => (
                    <div
                        key={item.name}
                        className='text-center items-center p-4 relative after:content-[""] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-3/5 after:w-[1px] after:bg-gray-400 last:after:w-0'
                    >
                        <h4 className="text-xl font-medium text-neutral-700 mb-2">
                            {item.numOfCandidate}
                        </h4>
                        <p className="text-neutral-500">{item.name}</p>
                    </div>
                ))}
            </div>
            <div className="w-full flex justify-between">
                <div className="hidden sm:block">
                    <span className="text-neutral-500 text-sm">{status}</span>
                </div>
                <div className="flex gap-5">
                    <span className="text-blue_primary_700 text-sm">
                        Candidates:{" "}
                        {arrs
                            .map(item => item.numOfCandidate)
                            .reduce(
                                (accumulator, currentValue) =>
                                    accumulator + currentValue
                            )}
                    </span>
                    <span className="text-green-500 text-sm">
                        In progress:{" "}
                        {arrs
                            .filter(item => item.name !== "Inbox")
                            .map(item => item.numOfCandidate)
                            .reduce(
                                (accumulator, currentValue) =>
                                    accumulator + currentValue
                            )}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
