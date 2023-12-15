"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import moment from "moment";
import { useParams } from "next/navigation";

import { useAppSelector } from "@/redux/reduxHooks";
import transactionServices from "@/services/transaction/transaction.service";

const CurrentPlan = () => {
    const { lang } = useParams();
    const authUser = useAppSelector(state => state.auth.authUser!!);

    const {
        data: latestPlan,
        isLoading,
        isError,
        isSuccess,
    } = useQuery({
        queryKey: ["cur-plan"],
        queryFn: () =>
            transactionServices.getLatestTransaction(
                authUser.organizationId ?? ""
            ),
    });

    if (isLoading) return <PlanSkeleton />;

    if (isError || (latestPlan && latestPlan.data.status !== "ACTIVE"))
        return <DefaultPlan />;

    if (isSuccess)
        return (
            <div className="flex items-stretch">
                <div className="w-full md:w-2/3 bg-white rounded-md drop-shadow-md">
                    <div className="p-4 md:p-6">
                        <div>
                            <h2 className="text-2xl font-semibold">
                                {latestPlan.data.subscriptionInfo.name}
                            </h2>
                        </div>

                        <div className="mt-6 text-sm">
                            <hr className="h-[1px] w-full bg-gray-300" />

                            <div className="mt-6 flex justify-between items-center">
                                <div>
                                    <p>
                                        {
                                            latestPlan.data.subscriptionInfo
                                                .employeeCapacity
                                        }{" "}
                                        <span className="underline">
                                            Employees in organization
                                        </span>{" "}
                                        {/* &#8226;{" "}
                                        <span className="text-gray-500 font-extralight">
                                            75 remaining
                                        </span> */}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="font-semibold text-blue_primary_600 hover:text-blue_primary_800 hover:underline"
                                >
                                    Manage
                                </button>
                            </div>

                            <hr className="mt-6 h-[1px] w-full bg-gray-300" />

                            <div className="mt-6">
                                <div className="flex items-center justify-between">
                                    <p>
                                        Your trial ends in{" "}
                                        {moment
                                            .utc(
                                                latestPlan.data.organization
                                                    .subscriptionExpiredTime
                                            )
                                            .diff(moment(), "days")}{" "}
                                        days, on{" "}
                                        {moment
                                            .utc(
                                                latestPlan.data.organization
                                                    .subscriptionExpiredTime
                                            )
                                            .locale(lang)
                                            .format("MMMM DD, yyyy")}
                                    </p>

                                    <button
                                        type="button"
                                        className="font-semibold text-blue_primary_600 hover:text-blue_primary_800 hover:underline"
                                    >
                                        Edit billing
                                    </button>
                                </div>
                                <div className="progress"></div>
                            </div>

                            <hr className="mt-6 h-[1px] w-full bg-gray-300" />

                            <div className="mt-6 flex items-center justify-between">
                                <strong className="text-neutral-700">
                                    Total
                                </strong>
                                <span className="font-semibold text-3xl">
                                    {latestPlan.data.subscriptionInfo.amount.toLocaleString()}
                                    VND
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pl-6 hidden md:block"></div>
            </div>
        );
    else return null;
};

export default CurrentPlan;

const PlanSkeleton = () => {
    return (
        <div className="flex items-stretch">
            <div className="w-full md:w-2/3 bg-white rounded-md drop-shadow-md">
                <div className="p-4 md:p-6">
                    <div className="animate-pulse">
                        <h2 className="text-2xl font-semibold w-36 h-8 bg-slate-200 mb-2"></h2>
                        <p className="text-sm text-gray-500 w-20 h-6 bg-slate-200"></p>
                    </div>

                    <div className="mt-6 text-sm">
                        <hr className="h-[1px] w-full bg-gray-300" />

                        <div className="mt-6 flex justify-between items-center">
                            <div className="animate-pulse">
                                <div className="w-44 h-5 bg-slate-200 mb-2"></div>
                                <div className="w-56 h-5 bg-slate-200"></div>
                            </div>
                        </div>

                        <hr className="mt-6 h-[1px] w-full bg-gray-300" />

                        <div className="mt-6">
                            <div className="animate-pulse">
                                <div className="w-80 h-5 bg-slate-200"></div>
                            </div>
                        </div>

                        <hr className="mt-6 h-[1px] w-full bg-gray-300" />

                        <div className="mt-6 flex items-center justify-between">
                            <strong className="text-neutral-700 opacity-0">
                                Total
                            </strong>
                            <span className="font-semibold text-3xl opacity-0">
                                $0
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pl-6 hidden md:block"></div>
        </div>
    );
};

const DefaultPlan = () => {
    return (
        <div className="flex items-stretch">
            <div className="w-full md:w-2/3 bg-white rounded-md drop-shadow-md">
                <div className="p-4 md:p-6">
                    <div>
                        <h2 className="text-2xl font-semibold">Trial plan</h2>
                        <p className="text-sm text-gray-500">15 days free</p>
                    </div>

                    <div className="mt-6 text-sm">
                        <hr className="h-[1px] w-full bg-gray-300" />

                        <div className="mt-6 flex justify-between items-center">
                            <div>
                                {/* <p>
                                    20 job slots &#8226;{" "}
                                    <span className="text-gray-500 font-extralight">
                                        19 remaining
                                    </span>
                                </p> */}
                                <p>
                                    75{" "}
                                    <span className="underline">
                                        Employees in organization
                                    </span>{" "}
                                    {/* &#8226;{" "}
                                    <span className="text-gray-500 font-extralight">
                                        75 remaining
                                    </span> */}
                                </p>
                            </div>

                            <button
                                type="button"
                                className="font-semibold text-blue_primary_600 hover:text-blue_primary_800 hover:underline"
                            >
                                Manage
                            </button>
                        </div>

                        <hr className="mt-6 h-[1px] w-full bg-gray-300" />

                        <div className="mt-6">
                            <div className="flex items-center justify-between">
                                <p>
                                    Your trial ends in 5 days, on December 5,
                                    2023
                                </p>

                                <button
                                    type="button"
                                    className="font-semibold text-blue_primary_600 hover:text-blue_primary_800 hover:underline"
                                >
                                    Edit billing
                                </button>
                            </div>
                            <div className="progress"></div>
                        </div>

                        <hr className="mt-6 h-[1px] w-full bg-gray-300" />

                        <div className="mt-6 flex items-center justify-between">
                            <strong className="text-neutral-700">Total</strong>
                            <span className="font-semibold text-3xl">$0</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pl-6 hidden md:block"></div>
        </div>
    );
};
