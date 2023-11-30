"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import moment from "moment";
import { useParams } from "next/navigation";

import jobServices from "@/services/job/job.service";

const JobList = () => {
    const { lang } = useParams();
    const { data: jobRes } = useQuery({
        queryKey: ["jobs"],
        queryFn: jobServices.getListAsync,
    });
    return (
        <div>
            <div className="mb-6"></div>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded overflow-hidden">
                <thead className="text-xs text-gray-700 uppercase bg-blue_primary_100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Created Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Organization
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Reports
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Reports
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {jobRes?.data.map((job, jobIndex) => (
                        <tr
                            key={job.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                            <td
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {jobIndex + 1}
                            </td>
                            <td className="px-6 py-4">{job.title}</td>
                            <td className="px-6 py-4">
                                {moment
                                    .utc(job.createdTime)
                                    .locale(lang)
                                    .local()
                                    .format()}
                            </td>
                            <td className="px-6 py-4">
                                {(job as any).organization.name}
                            </td>
                            <td className="px-6 py-4">{job.status}</td>
                            <td className="px-6 py-4">$2999</td>
                            <td className="px-6 py-4">
                                <button type="button">Disable</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JobList;
