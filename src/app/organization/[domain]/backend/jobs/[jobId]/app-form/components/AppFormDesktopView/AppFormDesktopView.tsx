"use client";

import React from "react";

import { useAppSelector } from "@/redux/reduxHooks";

import AppFormDesktopSection from "./AppFormDesktopSection";

const AppFormDesktopView = () => {
    const job = useAppSelector(state => state.job.data);
    return (
        <div className="w-full max-h-[600px] shadow-lg overflow-y-auto">
            <div className="bg-white flex flex-col gap-6 items-center py-16">
                <h1 className="text-4xl font-medium text-blue_primary_800">
                    Hirelight
                </h1>
                <h3 className="text-2xl font-medium">{"C# Developer"} </h3>
            </div>
            <div className="">
                <div className="w-full drop-shadow-md bg-white border-t border-gray-300 sticky top-0">
                    <div className="flex gap-8 w-fit  font-medium uppercase text-neutral-500 mx-auto">
                        <span className="py-4 ">Overview</span>
                        <span className='py-4 text-blue_primary_700 relative after:content-[""] after:absolute after:w-full after:left-0 after:bottom-0 after:h-0.5 rounded-full after:bg-blue_primary_800'>
                            Application
                        </span>
                    </div>
                </div>
                <div className="min-h-[800px] bg-slate-100 w-full pointer-events-none">
                    <div className="max-w-3xl py-10 mx-auto">
                        <AppFormDesktopSection />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppFormDesktopView;
