"use client";

import React, { FormEvent, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Button, Modal, Selection } from "@/components";
import { IOrgEmployerDto, IPermissionDto } from "@/services";
import collaboratorsServices from "@/services/collaborators/collaborators.service";
import employerOrgServices from "@/services/employer-organization/employer-organization.service";
import { ICollaboratorDto } from "@/services/collaborators/collaborators.interface";
import { handleError } from "@/helpers";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import PermissionTable from "./PermissionTable";

interface NewMemberModalProps {
    collabList: ICollaboratorDto[];
    isOpen: boolean;
    onClose: () => void;
}

const NewMemberModal: React.FC<NewMemberModalProps> = ({
    isOpen = false,
    onClose,
    collabList,
}) => {
    const { jobId, lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "job-member");

    const [selectEmployer, setSelectEmployer] =
        React.useState<IOrgEmployerDto>();
    const [currentPermissions, setCurrentPermissions] = useState<
        IPermissionDto[]
    >([]);

    const { data: memberRes, isLoading } = useQuery({
        queryKey: ["members"],
        queryFn: employerOrgServices.getListAsync,
        select(data) {
            const collabMap = new Map<string, IOrgEmployerDto>();
            data.data.forEach(item => {
                if (!collabMap.has(item.employerDto.id))
                    collabMap.set(item.employerDto.id, item);
            });

            collabList.forEach(item => {
                if (collabMap.has(item.employerDto.id)) {
                    collabMap.delete(item.employerDto.id);
                }
            });
            return Array.from(collabMap.values());
        },
    });
    const sendInvitationMutate = useMutation({
        mutationFn: selectEmployer
            ? () =>
                  collaboratorsServices.sendInvitation({
                      jobPostId: jobId as string,
                      employerId: selectEmployer.employerDto.id,
                      permissions: currentPermissions.map(item => ({
                          permissionId: item.id,
                          permissionName: item.name,
                          assessmentId: item.assessmentId ?? "",
                      })),
                  })
            : undefined,
        onSuccess: res => {
            toast.success(res.message);
            setSelectEmployer(undefined);
            setCurrentPermissions([]);
            onClose();
        },
        onError: error => {
            handleError(error);
        },
    });

    const handleSendInvitation = async (e: FormEvent) => {
        e.preventDefault();
        if (!selectEmployer)
            return toast.error(t("select_at_least_one_employer"));

        sendInvitationMutate.mutate();
    };

    return (
        <Modal
            position="top"
            isOpen={isOpen}
            onClose={onClose}
            className="bg-white rounded-md"
        >
            <form onSubmit={handleSendInvitation}>
                <div className="p-6 border-b border-gray-300 relative">
                    <h1 className="text-2xl font-medium text-neutral-900">
                        {t("invite_new_member")}
                    </h1>
                    <button
                        type="button"
                        className="absolute top-1/2 right-6 -translate-y-1/2 group"
                        onClick={() => {
                            setCurrentPermissions([]);
                            onClose();
                        }}
                    >
                        <XCircleIcon className="w-8 h-8 text-blue_primary_700 group-hover:text-blue-800 transition-all" />
                    </button>
                </div>
                <div className="p-6">
                    <div className="mb-6">
                        <Selection
                            title={t("common:email")}
                            placeholder={t("select_a_member")}
                            value={
                                selectEmployer
                                    ? selectEmployer?.employerDto.email
                                    : ""
                            }
                            items={
                                memberRes?.map(item => ({
                                    label: item.employerDto.email,
                                    value: item,
                                })) ?? []
                            }
                            onChange={value => setSelectEmployer(value)}
                            isLoading={isLoading}
                        />
                    </div>

                    <PermissionTable
                        curPemissions={currentPermissions}
                        onChange={(newPermissions: IPermissionDto[]) =>
                            setCurrentPermissions(newPermissions)
                        }
                    />
                </div>

                <div className="p-6 border-t border-gray-300 text-right">
                    <Button
                        type="submit"
                        isLoading={sendInvitationMutate.isPending}
                        disabled={sendInvitationMutate.isPending}
                    >
                        Send invitation
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default NewMemberModal;
