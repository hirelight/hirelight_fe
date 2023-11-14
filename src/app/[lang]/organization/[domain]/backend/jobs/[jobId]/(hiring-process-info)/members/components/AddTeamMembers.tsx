"use client";

import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { UsersIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { Button, ButtonOutline, Portal, Selection } from "@/components";
import collaboratorsServices from "@/services/collaborators/collaborators.service";
import { useUserInfo } from "@/hooks/useUserInfo";
import { IUserDto } from "@/services";
import { ICollaboratorDto } from "@/services/collaborators/collaborators.interface";

import styles from "./AddTeamMembers.module.scss";
import NewMemberModal from "./NewMemberModal";
import CollaboratorList from "./CollaboratorList";

const AddTeamMebers = () => {
    const { jobId } = useParams();
    const userData = useUserInfo<IUserDto>();

    const [datas, setDatas] = React.useState<ICollaboratorDto[]>([]);
    const [showModal, setShowModal] = React.useState(false);
    const [selectedInternal, setSelectedInternal] = React.useState<any>();
    const {
        data: res,
        error,
        isLoading,
    } = useQuery({
        queryKey: [`jobpost-${jobId as string}-collaborators`],
        queryFn: () =>
            collaboratorsServices.getCollaboratorList(jobId as string),
    });

    const handleAddMemeber = (newMember: any) => {
        const existingMember = datas.find(
            member => member.employerDto.email === newMember.email
        );
        if (existingMember) return toast.error("Member already added");
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
            {res && res?.data!!.length > 0 ? (
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
            <div className="p-6">
                <div className="mb-4">
                    <h1 className="text-neutral-800 font-medium">
                        New Memebers
                    </h1>
                    <p className="text-sm text-neutral-500">
                        You can add other members to your team to collaborate on
                        this work.
                    </p>
                </div>
                <div className="w-full flex items-center justify-between gap-4 flex-wrap">
                    <div className="w-full md:w-auto flex items-center gap-2">
                        <div className="flex-1 md:flex-auto">
                            <Selection
                                title=""
                                items={[]}
                                onChange={(value: string) => {}}
                            />
                        </div>
                        <Button
                            className="whitespace-nowrap"
                            onClick={() => {
                                if (!selectedInternal) return;

                                const existingMember = datas.find(
                                    member =>
                                        member.employerDto.email ===
                                        selectedInternal.email
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
