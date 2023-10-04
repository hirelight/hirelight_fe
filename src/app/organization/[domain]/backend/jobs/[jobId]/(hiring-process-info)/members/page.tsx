import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";
import React from "react";

import AddTeamMebers from "./components/AddTeamMebers";

export const metadata: Metadata = {
    title: "Hirelight - Backend | Team members",
};

const HiringPipelineMembers = () => {
    return (
        <div className="w-full bg-white shadow-lg rounded-md">
            <div className="p-6">
                <h1 className="text-lg font-medium text-neutral-800 flex items-center mb-8">
                    Team members
                    <span className="relative group">
                        <QuestionMarkCircleIcon className="w-6 h-6 ml-2 text-neutral-400 cursor-pointer" />
                        <div className="absolute z-20 top-full mt-2 left-0 -translate-x-1/2 w-[360px] rounded-md border border-gray-200 p-4 bg-white shadow-lg opacity-0 invisible  group-hover:opacity-100 group-hover:visible transition-all duration-300 delay-300">
                            <h2 className="text-sm font-medium text-neutral-800 mb-4">
                                What is this?
                            </h2>
                            <p className="text-neutral-500 font-normal text-sm">
                                Want your colleagues to help you out or give you
                                their opinion? Specify the collaborators for
                                this job. You may pick one or more of the
                                account members from the list below. Can&apos;t
                                find some colleagues in the list? Invite them to
                                join the account. Once they sign up, they will
                                automatically have access to this job.
                            </p>
                        </div>
                    </span>
                </h1>
                <AddTeamMebers />
            </div>
        </div>
    );
};

export default HiringPipelineMembers;
