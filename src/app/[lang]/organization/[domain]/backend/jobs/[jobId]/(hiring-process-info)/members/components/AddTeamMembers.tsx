"use client";

import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { TrashIcon } from "@heroicons/react/24/solid";
import { UsersIcon } from "@heroicons/react/24/outline";

import { teamMembers } from "@/utils/shared/initialDatas";
import { Button, ButtonOutline, Portal, Selection } from "@/components";

import NewMemberModal from "./NewMemberModal";
import styles from "./AddTeamMembers.module.scss";

const internalMembers = [
    {
        full_name: "Tran Nhat Hoang",
        email: "hoangnt@gmail.com",
        status: "LA",
        permission: "Limited access",
        avatarUrl:
            "https://robohash.org/natusmagnambeatae.png?size=50x50&set=set1",
    },
    {
        full_name: "Pham Trong Thanh",
        email: "thanhpt@gmail.com",
        status: "SA",
        permission: "Standard access",
        avatarUrl: "https://robohash.org/quiaeos.png?size=50x50&set=set1",
    },
    {
        full_name: "Quach Heng Toni",
        email: "toniqh@gmail.com",
        status: "FA",
        permission: "Full access",
        avatarUrl: "https://robohash.org/etcumat.png?size=50x50&set=set1",
    },
    {
        full_name: "Nguyen Thanh Kien",
        email: "kiennt@gmail.com",
        status: "FA",
        permission: "Full access",
        avatarUrl:
            "https://robohash.org/voluptatibusaliquamnatus.png?size=50x50&set=set1",
    },
];

const AddTeamMebers = () => {
    const [datas, setDatas] = React.useState<typeof teamMembers>([]);
    const [showModal, setShowModal] = React.useState(false);
    const [selectedInternal, setSelectedInternal] = React.useState<any>();

    const handleRemoveMember = (memberId: any) => {
        setDatas(prev => prev.filter(member => member.id !== memberId));
    };

    const handleAddMemeber = (newMember: any) => {
        const existingMember = datas.find(
            member => member.email === newMember.email
        );
        if (existingMember) return toast.error("Member already added");

        setDatas([
            ...datas,
            {
                id: datas.length + 1,
                full_name:
                    newMember.fullName.charAt(0).toUpperCase() +
                    newMember.fullName.slice(1),
                email: newMember.email,
                status: "SA",
                permission: newMember.permission.name,
                avatarUrl:
                    "https://robohash.org/natusmagnambeatae.png?size=50x50&set=set1",
            },
        ]);
    };

    return (
        <div className="relative rounded-md border border-slate-200">
            <Portal>
                <NewMemberModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onSendInvitation={handleAddMemeber}
                />
            </Portal>
            {datas.length > 0 ? (
                <div className={styles.table__wrapper}>
                    <table className="w-full text-sm text-left text-gray-500  dark:text-gray-400 overflow-hidden">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b dark:border-gray-700 relative shadow-md">
                            <tr>
                                <th scope="col" className="p-6">
                                    Member name
                                </th>
                                <th
                                    scope="col"
                                    className="p-6 hidden lg:table-cell"
                                >
                                    Email
                                </th>
                                <th
                                    scope="col"
                                    className="p-6 hidden md:table-cell"
                                >
                                    Permission
                                </th>
                                <th
                                    scope="col"
                                    className="p-6 hidden lg:table-cell"
                                >
                                    Status
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.map(member => (
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
                                    <td className="px-6 py-4 hidden lg:table-cell">
                                        {member.email}
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        {member.permission}
                                    </td>
                                    <td className="px-6 py-4 hidden lg:table-cell">
                                        {member.status}
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={handleRemoveMember.bind(
                                                null,
                                                member.id
                                            )}
                                            className="group"
                                        >
                                            <TrashIcon className="text-red-500 group-hover:text-red-700 w-6 h-6" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="w-full flex flex-col items-center py-6">
                    <UsersIcon className="text-gray-600 w-14 h-14 mb-8" />
                    <h2 className="text-2xl text-neutral-700 font-semibold mb-2">
                        No account members in this hiring team
                    </h2>
                    <p className="text-sm text-neutral-700">
                        There are no members collaborating on this job. You can
                        add someone from your team or invite a new member.
                    </p>
                </div>
            )}
            <div className="p-6">
                <div className="mb-4">
                    <h1 className="text-neutral-800 font-medium">
                        New Memebers
                    </h1>
                    <p className="text-sm text-neutral-500">
                        Bạn có thể thêm các thành viên tài khoản khác vào nhóm
                        của mình hoặc mời mọi người tham gia Workable để cộng
                        tác trong công việc này.
                    </p>
                </div>
                <div className="w-full flex items-center justify-between gap-4 flex-wrap">
                    <div className="w-full md:w-auto flex items-center gap-2">
                        <div className="flex-1 md:flex-auto">
                            <Selection
                                title=""
                                datas={internalMembers.map(item => item.email)}
                                value={
                                    selectedInternal
                                        ? selectedInternal.email
                                        : ""
                                }
                                onChange={(value: string) => {
                                    setSelectedInternal({
                                        ...internalMembers.find(
                                            member => member.email === value
                                        )!!,
                                    });
                                }}
                            />
                        </div>
                        <Button
                            className="whitespace-nowrap"
                            onClick={() => {
                                if (!selectedInternal) return;

                                const existingMember = datas.find(
                                    member =>
                                        member.email === selectedInternal.email
                                );
                                if (existingMember)
                                    return toast.error("Member already added");
                                setDatas([
                                    ...datas,
                                    {
                                        id: datas.length + 1,
                                        ...selectedInternal,
                                    },
                                ]);
                                setSelectedInternal(undefined);
                            }}
                        >
                            Add to team
                        </Button>
                    </div>
                    <ButtonOutline
                        className="whitespace-nowrap w-full md:w-fit"
                        onClick={() => setShowModal(true)}
                    >
                        Invite a new member
                    </ButtonOutline>
                </div>
            </div>
        </div>
    );
};

export default AddTeamMebers;
