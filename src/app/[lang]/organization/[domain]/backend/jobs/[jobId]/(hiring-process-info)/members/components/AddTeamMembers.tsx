"use client";

import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { UsersIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { Button, Portal } from "@/components";
import collaboratorsServices from "@/services/collaborators/collaborators.service";
import { IUserDto } from "@/services";
import { ICollaboratorDto } from "@/services/collaborators/collaborators.interface";
import { useAppSelector } from "@/redux/reduxHooks";
import queryKeyConst from "@/utils/constants/query-key.constant";

import styles from "./AddTeamMembers.module.scss";
import NewMemberModal from "./NewMemberModal";
import CollaboratorList from "./CollaboratorList";

const AddTeamMebers = () => {
    const { jobId } = useParams();
    const userData = useAppSelector(state => state.auth.authUser);

    const [datas, setDatas] = React.useState<ICollaboratorDto[]>([]);
    const [showModal, setShowModal] = React.useState(false);
    const {
        data: res,
        error,
        isLoading,
    } = useQuery({
        queryKey: [queryKeyConst.COLLABORATOR_LIST, jobId],
        queryFn: () =>
            collaboratorsServices.getCollaboratorList(jobId as string),
    });

    const handleAddMemeber = (newMember: any) => {
        const existingMember = datas.find(
            member => member.employerDto.email === newMember.email
        );
        if (existingMember) return toast.error("Member already added");
    };

    if (isLoading) {
        return (
            <div className="relative rounded-md border border-slate-200">
                <CollaboratorListLoading />
            </div>
        );
    }

    return (
        <div className="relative rounded-md border border-slate-200">
            <Portal>
                <NewMemberModal
                    isOpen={showModal}
                    collabList={res ? res.data : []}
                    onClose={() => setShowModal(false)}
                    onSendInvitation={handleAddMemeber}
                />
            </Portal>
            {res && res.data.length > 0 ? (
                <div className={styles.table__wrapper}>
                    <CollaboratorList datas={res.data} />
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
            <div className="py-4 px-6 border-t border-gray-300">
                <div className="w-full flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex-1"></div>
                    <Button
                        className="whitespace-nowrap w-full md:w-fit disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                        onClick={() => setShowModal(true)}
                    >
                        Invite a new member
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddTeamMebers;

const CollaboratorListLoading = () => {
    return (
        <table className="w-full text-sm text-left text-gray-500  dark:text-gray-400 overflow-hidden">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b dark:border-gray-700 relative shadow-md">
                <tr>
                    <th scope="col" className="p-6 hidden md:table-cell">
                        Member name
                    </th>
                    <th scope="col" className="p-6">
                        Email
                    </th>
                    <th scope="col" className="p-6 hidden lg:table-cell">
                        Status
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {new Array(4).fill("").map((_, index) => (
                    <tr key={index} className="">
                        <td
                            scope="col"
                            className="animate-pulse p-4 hidden md:table-cell"
                        >
                            <div className="w-full h-6 bg-slate-200 rounded-md"></div>
                        </td>
                        <td scope="col" className="animate-pulse p-4">
                            <div className="w-full h-6 bg-slate-200 rounded-md"></div>
                        </td>
                        <td
                            scope="col"
                            className="animate-pulse p-4 hidden lg:table-cell"
                        >
                            <div className="w-full h-6 bg-slate-200 rounded-md"></div>
                        </td>
                        <th></th>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
