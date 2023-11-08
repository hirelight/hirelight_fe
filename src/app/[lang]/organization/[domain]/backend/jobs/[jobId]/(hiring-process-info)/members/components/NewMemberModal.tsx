"use client";

import React, { FormEvent, useState } from "react";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";

import { Button, CustomInput, Modal } from "@/components";
import permissionServices from "@/services/permission/permission.service";
import { IPermissionDto } from "@/services";

import PermissionTable from "./PermissionTable";

interface NewMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSendInvitation: (newMember: any) => void;
}

const NewMemberModal: React.FC<NewMemberModalProps> = ({
    isOpen = false,
    onClose,
    onSendInvitation,
}) => {
    const [email, setEmail] = React.useState("");
    const [currentPermissions, setCurrentPermissions] = useState<
        IPermissionDto[]
    >([]);

    const handleSendInvitation = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await permissionServices.getJobPostPermission();
        } catch (error) {}

        setCurrentPermissions([]);
        onClose();
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
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                            required
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
                    <Button type="submit">Send invitation</Button>
                </div>
            </form>
        </Modal>
    );
};

export default NewMemberModal;
