"use client";

import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "flowbite-react";
import React from "react";

const Heading = () => {
    return (
        <h1 className="text-lg font-medium text-neutral-800 flex items-center mb-8">
            Team members
            <span>
                <Tooltip
                    style="light"
                    placement="bottom"
                    animation="duration-500"
                    content={
                        <div className="w-[360px] p-4 bg-white ">
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
                    }
                >
                    <QuestionMarkCircleIcon className="w-6 h-6 ml-2 text-neutral-400 cursor-pointer" />
                </Tooltip>
            </span>
        </h1>
    );
};

export default Heading;
