"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import moment from "moment";
import { useParams } from "next/navigation";
import { EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { toast } from "react-toastify";

import jobServices from "@/services/job/job.service";
import { DeleteModal, Portal } from "@/components";
import { ArrowRotateLeftIcon, BanIcon } from "@/icons";

const JobList = () => {
    const { lang } = useParams();
    const { data: jobRes } = useQuery({
        queryKey: ["jobs"],
        queryFn: () => jobServices.getListAsync(),
    });

    const [selectedId, setSelectedId] = useState<string>();

    const queryClient = useQueryClient();
    const disableMutation = useMutation({
        mutationKey: ["disable-job", selectedId],
        mutationFn: (id: string) => jobServices.suspendJob(id),
        onSuccess: async res => {
            await queryClient.invalidateQueries({
                queryKey: ["jobs"],
            });
            toast.success(res.message);
            setSelectedId(undefined);
        },
        onError(error) {
            toast.error(error.message);
        },
    });

    const reativateMutation = useMutation({
        mutationKey: ["reactivate-job", selectedId],
        mutationFn: (id: string) => jobServices.reactivateJob(id),
        onSuccess: async res => {
            await queryClient.invalidateQueries({
                queryKey: ["jobs"],
            });
            toast.success(res.message);
            setSelectedId(undefined);
        },
        onError(error) {
            toast.error(error.message);
        },
    });

    const handleSuspendJob = async () => {
        if (selectedId) await disableMutation.mutateAsync(selectedId);
    };

    const handleReactivateJob = async (id: string) => {
        await reativateMutation.mutateAsync(id);
    };

    return (
        <div>
            <Portal>
                <DeleteModal
                    title="Disable job post"
                    description={`Are you sure you want to disable this job?`}
                    loading={disableMutation.isPending}
                    show={selectedId !== undefined}
                    onClose={() => setSelectedId(undefined)}
                    onConfirm={handleSuspendJob}
                />
            </Portal>

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

                        <th scope="col" className="px-6 py-3 text-center">
                            Actions
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Details
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
                                    .format("DD/MM/yyyy")}
                            </td>
                            <td className="px-6 py-4">
                                {(job as any).organization.name}
                            </td>
                            <td className="px-6 py-4">{job.status}</td>
                            <td className="px-6 py-4 text-center">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (job.status !== "SUSPENDED")
                                            setSelectedId(job.id);
                                        else handleReactivateJob(job.id);
                                    }}
                                    className="p-1 rounded hover:bg-slate-200 group disabled:opacity-80 disabled:cursor-not-allowed"
                                    disabled={
                                        disableMutation.isPending ||
                                        reativateMutation.isPending
                                    }
                                >
                                    {job.status === "SUSPENDED" ? (
                                        <ArrowRotateLeftIcon className="w-5 h-5 text-green-500 group-hover:text-green-700" />
                                    ) : (
                                        <BanIcon className="w-5 h-5 text-red-500 group-hover:text-red-700" />
                                    )}
                                </button>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <Link
                                    href={`job-posts/${job.id}`}
                                    type="button"
                                    className="w-5 h-5"
                                >
                                    <EyeIcon />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JobList;
