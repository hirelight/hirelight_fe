"use client";

import React from "react";

const CurrentPlan = () => {
    return (
        <div className="flex items-stretch">
            <div className="w-full md:w-2/3 bg-white rounded-md drop-shadow-md">
                <div className="p-4 md:p-6">
                    <div>
                        <h2 className="text-2xl font-semibold">
                            Standard Plan Trial
                        </h2>
                        <p className="text-sm text-gray-500">15 days free</p>
                    </div>

                    <div className="mt-6 text-sm">
                        <hr className="h-[1px] w-full bg-gray-300" />

                        <div className="mt-6 flex justify-between items-center">
                            <div>
                                <p>
                                    20 job slots &#8226;{" "}
                                    <span className="text-gray-500 font-extralight">
                                        19 remaining
                                    </span>
                                </p>
                                <p>
                                    75{" "}
                                    <span className="underline">
                                        People Search profile views
                                    </span>{" "}
                                    &#8226;{" "}
                                    <span className="text-gray-500 font-extralight">
                                        75 remaining
                                    </span>
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

export default CurrentPlan;
