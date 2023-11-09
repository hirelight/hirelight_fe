"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { Button, CustomInput, Modal, Selection } from "@/components";
import permissionServices from "@/services/permission/permission.service";
import { IOrgEmployerDto, IPermissionDto } from "@/services";
import collaboratorsServices from "@/services/collaborators/collaborators.service";
import { useAppSelector } from "@/redux/reduxHooks";
import organizationsServices from "@/services/organizations/organizations.service";

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
    const { jobId } = useParams();

    const [selectEmployer, setSelectEmployer] =
        React.useState<IOrgEmployerDto>();
    const [employers, setEmployers] = useState<IOrgEmployerDto[]>([]);
    const [currentPermissions, setCurrentPermissions] = useState<
        IPermissionDto[]
    >([]);
    const { authUser }: any = useAppSelector(state => state.auth);

    const handleSendInvitation = async (e: FormEvent) => {
        e.preventDefault();
        if (!selectEmployer) return toast.error("Select at least one employer");

        console.log(currentPermissions);
        // try {
        //     const res = await collaboratorsServices.sendInvitation({
        //         jobPostId: parseInt(jobId as string),
        //         employerId: selectEmployer.employerDto.id,
        //         permissions: currentPermissions.map(item => ({
        //             permissionId: item.id,
        //             permissionName: item.name,
        //         })),
        //     });

        //     toast.success(res.message);
        // } catch (error) {
        //     toast.error("Send failure");
        //     console.error(error);
        // }

        setCurrentPermissions([]);
        onClose();
    };

    useEffect(() => {
        const getEmployers = async () => {
            try {
                const res = await organizationsServices.getListEmloyers();
                const filteredEmployers = res.data.filter(
                    member =>
                        member.employerDto.id.toString() !== authUser.userId
                );
                console.log(authUser, filteredEmployers);
                setEmployers(filteredEmployers);
                setSelectEmployer(filteredEmployers[0]);
                console.log(res);
            } catch (error) {
                toast.error("Get employers failure");
            }
        };

        getEmployers();
    }, []);

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
                        {/* <CustomInput
                            id="member-email"
                            title="Email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                            required
                        /> */}
                        <Selection
                            title="Email"
                            value={selectEmployer?.employerDto.email}
                            items={employers.map(item => ({
                                label: item.employerDto.email,
                                value: item,
                            }))}
                            onChange={value => setSelectEmployer(value)}
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
