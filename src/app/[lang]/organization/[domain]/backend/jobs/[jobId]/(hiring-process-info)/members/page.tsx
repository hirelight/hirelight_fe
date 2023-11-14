import { Metadata } from "next";
import React from "react";
import dynamic from "next/dynamic";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

import AddTeamMebers from "./components/AddTeamMembers";

const HeadingNoSSR = dynamic(() => import("./components/Heading"), {
    ssr: false,
    loading: () => (
        <h1 className="text-lg font-medium text-neutral-800 flex items-center mb-8">
            Team members
            <span>
                <QuestionMarkCircleIcon className="w-6 h-6 ml-2 text-neutral-400 cursor-pointer" />
            </span>
        </h1>
    ),
});

export const metadata: Metadata = {
    title: "Hirelight - Backend | Team members",
};

const HiringPipelineMembers = () => {
    return (
        <div className="w-full bg-white shadow-lg rounded-md">
            <div className="p-4 xl:p-6">
                <HeadingNoSSR />
                <AddTeamMebers />
            </div>
        </div>
    );
};

export default HiringPipelineMembers;
