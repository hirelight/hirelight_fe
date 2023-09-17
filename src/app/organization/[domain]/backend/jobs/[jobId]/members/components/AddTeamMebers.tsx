"use client";

import React from "react";
import Image from "next/image";

import { teamMembers } from "@/utils/shared/initialDatas";
import { Button, ButtonOutline, Selection } from "@/components";

const AddTeamMebers = () => {
    return (
        <div className="relative rounded-md border border-slate-200 overflow-hidden">
            <div className="relative">
                <table className="w-full text-sm text-left text-gray-500  dark:text-gray-400 overflow-hidden">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b dark:border-gray-700 relative shadow-md">
                        <tr>
                            <th scope="col" className="p-6">
                                Member name
                            </th>
                            <th scope="col" className="p-6">
                                Email
                            </th>
                            <th scope="col" className="p-6">
                                Permission
                            </th>
                            <th scope="col" className="p-6">
                                Status
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamMembers.map(member => (
                            <tr
                                key={member.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-block h-8 w-8 rounded-full bg-white border border-slate-500 overflow-auto">
                                            <Image
                                                src={member.avatarUrl}
                                                alt="member avatar"
                                                width={32}
                                                height={32}
                                                unoptimized
                                            />
                                        </span>
                                        {member.full_name}
                                    </div>
                                </td>
                                <td className="px-6 py-4">{member.email}</td>
                                <td className="px-6 py-4">
                                    {member.permission}
                                </td>
                                <td className="px-6 py-4">
                                    {member.status} <div></div>
                                </td>
                                <td>
                                    <ButtonOutline className="text-red-500 border-red-500 hover:bg-red-700 hover:border-red-700">
                                        Delete
                                    </ButtonOutline>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-6">
                <h1 className="text-neutral-800 font-medium">New Memebers</h1>
                <p className="text-sm text-neutral-500">
                    Bạn có thể thêm các thành viên tài khoản khác vào nhóm của
                    mình hoặc mời mọi người tham gia Workable để cộng tác trong
                    công việc này.
                </p>
                <div className="w-full flex items-center gap-2">
                    <div>
                        <Selection
                            title=""
                            datas={["NTK", "Hello"]}
                            onChange={() => {}}
                        />
                    </div>
                    <div>
                        <Button>Add to team</Button>
                    </div>
                    <ButtonOutline className="ml-auto">
                        Invite a new member
                    </ButtonOutline>
                </div>
            </div>
        </div>
    );
};

export default AddTeamMebers;
