import React from "react";
import { Metadata } from "next";

import { SearchIcon } from "@/icons";
import { Selection } from "@/components";

import MemberList from "./components/MemberList";
import AddNewMember from "./components/AddNewMember";

export const metadata: Metadata = {
    title: "Hirelight - Member",
};

const MembersSetting = () => {
    return (
        <div className="bg-white rounded-md shadow-md p-4 xl:px-6">
            {/* <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <SearchIcon className="w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-md border-0 py-2.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue_primary_700 sm:sm:leading-6"
                    />
                </div>
                <Selection
                    title=""
                    items={["Department"].map(item => ({
                        label: item,
                        value: item,
                    }))}
                    onChange={() => {}}
                />
                <Selection
                    title=""
                    items={["Department"].map(item => ({
                        label: item,
                        value: item,
                    }))}
                    onChange={() => {}}
                />
            </div> */}
            {/* <div className="text-sm text-neutral-700 mb-6">
                <label className="relative inline-flex items-center mb-1 cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <strong className="ml-3 text-sm dark:text-gray-300">
                        Enable Auto-join
                    </strong>
                </label>
                <p className="text-neutral-500 mb-2">
                    Allow anyone that signs up with an{" "}
                    <strong>@fpt.edu.vn email</strong> address to join the
                    account automatically.
                </p>
                <p className="text-neutral-400">
                    Note: until they are invited to collaborate on specific
                    jobs, members arriving via auto-join will have limited
                    access to the account.
                </p>
            </div> */}

            <AddNewMember />

            <MemberList />
        </div>
    );
};

export default MembersSetting;
