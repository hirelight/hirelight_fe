"use client";

import React, { FormEvent } from "react";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Button, CustomInput, Modal } from "@/components";

const permissions = [
    {
        name: "Limited access",
        value: "limited",
    },
    {
        name: "Standard access",
        value: "standard",
    },
    {
        name: "All access",
        value: "all",
    },
];

interface INewMemberModalModal {
    isOpen: boolean;
    onClose: () => void;
    onSendInvitation: (newMember: any) => void;
}

const NewMemberModal = ({
    isOpen = false,
    onClose,
    onSendInvitation,
}: INewMemberModalModal) => {
    const [email, setEmail] = React.useState("");
    const [selectedPermission, setSelectedPermission] = React.useState(
        permissions[1]
    );

    const resetForm = () => {
        setEmail("");
        setSelectedPermission(permissions[1]);
    };

    const handleSendInvitation = (e: FormEvent) => {
        e.preventDefault();

        onSendInvitation({
            email: email,
            permission: selectedPermission,
            fullName: email.replace("@gmail.com", ""),
        });

        resetForm();
        onClose();
    };

    return (
        <Modal position="top" isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSendInvitation}>
                <div className="p-6 border-b border-gray-300 relative">
                    <h1 className="text-2xl font-medium text-neutral-900">
                        Invite a new member
                    </h1>
                    <button
                        type="button"
                        className="absolute top-1/2 right-6 -translate-y-1/2 group"
                        onClick={onClose}
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
                    <div className="mb-4">
                        <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            User permissions
                        </span>
                        <div className="flex gap-6 mb-2">
                            {permissions.map(permission => (
                                <div
                                    key={permission.value}
                                    className="flex items-center"
                                >
                                    <input
                                        defaultChecked={
                                            selectedPermission.value ===
                                            permission.value
                                        }
                                        id={`permission-${permission.value}`}
                                        type="radio"
                                        value={permission.value}
                                        name="hiring-process-member-permission"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        onChange={e => {
                                            if (e.currentTarget.checked)
                                                setSelectedPermission(
                                                    permission
                                                );
                                        }}
                                    />
                                    <label
                                        htmlFor={`permission-${permission.value}`}
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        {permission.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500">
                            This is the most versatile option. Based on job or
                            department these users can: create jobs and hiring
                            teams, assign roles in a team, move and comment on
                            candidates.
                        </p>
                    </div>

                    <div className="border border-blue-500 rounded-sm p-2 flex items-start gap-2">
                        <span>
                            <LightBulbIcon className="text-blue-700 w-6 h-6" />
                        </span>
                        <p className="flex-1 text-sm text-neutral-700">
                            Invited members will automatically become
                            collaborators for this job, once they sign up.
                        </p>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-300 text-right">
                    <Button type="submit">Send invitation</Button>
                </div>
            </form>
        </Modal>
    );
};

export default NewMemberModal;
