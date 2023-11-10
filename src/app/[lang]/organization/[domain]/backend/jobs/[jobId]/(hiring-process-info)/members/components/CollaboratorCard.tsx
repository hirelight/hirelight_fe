import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

import collaboratorsServices from "@/services/collaborators/collaborators.service";
import { ICollaboratorDto } from "@/services/collaborators/collaborators.interface";
import { DeleteModal, Portal } from "@/components";

import EditMemberPermission from "./EditMemberPermission";

type CollaboratorCardProps = {
    member: ICollaboratorDto;
};

const CollaboratorCard: React.FC<CollaboratorCardProps> = ({ member }) => {
    const { jobId } = useParams();
    const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const deleteMemberMutation = useMutation({
        mutationKey: ["deleteMemberById"],
        mutationFn: (memberId: number) =>
            collaboratorsServices.deleteCollaborator(
                parseInt(jobId as string),
                memberId
            ),
        onSuccess: res => {
            toast.success(res.message);
            setIsLoading(false);
        },
        onError: err => {
            console.error(err);
            setIsLoading(false);
        },
    });

    const handleDeleteMember = (memberId: number) => {
        setIsLoading(true);
        deleteMemberMutation.mutate(memberId);
        setIsLoading(false);
    };

    return (
        <>
            <Portal>
                <DeleteModal
                    title="Delete question"
                    description="Are you sure you want to delete this question? All of your data will be permanently removed. This action cannot be undone."
                    show={showDeleteAlert}
                    loading={isLoading}
                    onClose={() => setShowDeleteAlert(false)}
                    onConfirm={() => handleDeleteMember(member.id)}
                />
                <EditMemberPermission
                    member={member}
                    isOpen={showEditModal}
                    onClose={() => setShowEditModal(false)}
                />
            </Portal>
            <tr
                key={member.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
                <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        <span className="inline-block h-8 w-8 rounded-full bg-white border border-slate-500 overflow-auto">
                            <Image
                                src={
                                    process.env.NEXT_PUBLIC_AVATAR_URL as string
                                }
                                alt="member avatar"
                                width={32}
                                height={32}
                                unoptimized
                            />
                        </span>
                        {member.employerDto.firstName +
                            `${member.employerDto.lastName ?? ""}`}
                    </div>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                    {member.employerDto.email}
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                    {member.employerDto.status}
                </td>
                <td>
                    <button
                        type="button"
                        onClick={() => setShowEditModal(true)}
                        className="group"
                    >
                        <PencilIcon className="text-blue_primary_600 group-hover:text-blue_primary_800 w-6 h-6 mr-2" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowDeleteAlert(true)}
                        className="group"
                    >
                        <TrashIcon className="text-red-500 group-hover:text-red-700 w-6 h-6" />
                    </button>
                </td>
            </tr>
        </>
    );
};

export default CollaboratorCard;
