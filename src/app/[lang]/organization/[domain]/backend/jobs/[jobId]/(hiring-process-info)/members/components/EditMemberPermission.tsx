"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

import { Button, CustomInput, Modal, Selection } from "@/components";
import permissionServices from "@/services/permission/permission.service";
import { IOrgEmployerDto, IPermissionDto } from "@/services";
import collaboratorsServices from "@/services/collaborators/collaborators.service";
import { useAppSelector } from "@/redux/reduxHooks";
import organizationsServices from "@/services/organizations/organizations.service";
import {
    ICollabPermission,
    ICollaboratorDto,
} from "@/services/collaborators/collaborators.interface";
import { SpinLoading } from "@/icons";

import PermissionTable from "./PermissionTable";

interface EditMemberPermissionProps {
    member: ICollaboratorDto;
    isOpen: boolean;
    onClose: () => void;
}

const EditMemberPermission: React.FC<EditMemberPermissionProps> = ({
    isOpen = false,
    onClose,
    member,
}) => {
    const { jobId } = useParams();
    const [currentPermissions, setCurrentPermissions] = useState<
        ICollabPermission[]
    >(member.permissions);
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    const handleUpdatePermission = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await collaboratorsServices.editCollaborator({
                jobPostId: jobId as string,
                employerId: member.employerDto.id,
                permissions: currentPermissions,
            });

            toast.success(res.message);
            queryClient.invalidateQueries({
                queryKey: ["collaborators", jobId],
            });
        } catch (error: any) {
            toast.error(error.message ? error.message : "Something went wrong");
        }
        setIsLoading(false);
        onClose();
    };

    useEffect(() => {
        setCurrentPermissions(member.permissions);
    }, [member]);

    return (
        <Modal
            position="top"
            isOpen={isOpen}
            onClose={onClose}
            className="bg-white rounded-md"
        >
            <form onSubmit={handleUpdatePermission}>
                <div className="p-6 border-b border-gray-300 relative">
                    <h1 className="text-2xl font-medium text-neutral-900">
                        Invite a new member
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
                        <CustomInput
                            id="member-email"
                            title="Email"
                            type="email"
                            placeholder="Email"
                            value={member.employerDto.email}
                            required
                            readOnly
                        />
                    </div>

                    <PermissionTable
                        curPemissions={currentPermissions.map(item => ({
                            name: item.permissionName,
                            id: item.permissionId,
                            assessmentId: item.assessmentId,
                        }))}
                        onChange={(newPermissions: IPermissionDto[]) =>
                            setCurrentPermissions(
                                newPermissions.map(item => ({
                                    permissionName: item.name,
                                    permissionId: item.id,
                                    assessmentId: item.assessmentId,
                                }))
                            )
                        }
                    />
                </div>

                <div className="p-6 border-t border-gray-300 text-right">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        isLoading={isLoading}
                    >
                        Save changes
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default EditMemberPermission;
