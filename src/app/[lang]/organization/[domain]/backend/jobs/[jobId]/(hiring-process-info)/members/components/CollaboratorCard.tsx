import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import collaboratorsServices from "@/services/collaborators/collaborators.service";
import { ICollaboratorDto } from "@/services/collaborators/collaborators.interface";
import { DeleteModal, Portal, UserAvatar } from "@/components";
import { useAppSelector } from "@/redux/reduxHooks";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import EditMemberPermission from "./EditMemberPermission";

type CollaboratorCardProps = {
    member: ICollaboratorDto;
};

const CollaboratorCard: React.FC<CollaboratorCardProps> = ({ member }) => {
    const { jobId, lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "job-member");

    const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);
    const [showEditModal, setShowEditModal] = React.useState(false);

    const job = useAppSelector(state => state.job.data);
    const { authUser } = useAppSelector(state => state.auth);

    const queryClient = useQueryClient();
    const deleteMemberMutation = useMutation({
        mutationKey: ["deleteMemberById"],
        mutationFn: (memberId: string) =>
            collaboratorsServices.deleteCollaborator(jobId as string, memberId),
        onSuccess: async res => {
            await queryClient.invalidateQueries({
                queryKey: ["collaborators", jobId],
            });
            toast.success(res.message);
        },
        onError: err => {
            toast.error(err.message ? err.message : "");
        },
    });

    const handleDeleteMember = (memberId: string) => {
        deleteMemberMutation.mutate(memberId);
    };

    return (
        <>
            <Portal>
                <DeleteModal
                    title={t("remove_collaborator")}
                    description={t("are_you_sure_remove_collaborator")}
                    show={showDeleteAlert}
                    loading={deleteMemberMutation.isPending}
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
                <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                        <div className="h-8 aspect-square">
                            <UserAvatar
                                avatarUrl={member.employerDto.avatarUrl}
                            />
                        </div>
                        {member.employerDto.firstName +
                            `${member.employerDto.lastName ?? ""}`}
                    </div>
                </td>
                <td className="px-6 py-4">{member.employerDto.email}</td>
                <td className="px-6 py-4 hidden lg:table-cell">
                    {member.status}
                </td>
                <td>
                    {authUser?.userId !== member.employerDto.id &&
                        authUser?.userId === job.creatorId && (
                            <>
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
                            </>
                        )}
                </td>
            </tr>
        </>
    );
};

export default CollaboratorCard;
