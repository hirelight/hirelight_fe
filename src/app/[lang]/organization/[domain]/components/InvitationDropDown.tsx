"use client";

import { EnvelopeIcon, InboxIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useOutsideClick } from "@/hooks/useClickOutside";
import { delayFunc } from "@/helpers";
import { IEmployerInvitationDto } from "@/services";
import employerOrgServices from "@/services/employer-organization/employer-organization.service";
import authServices from "@/services/auth/auth.service";
import organizationsServices from "@/services/organizations/organizations.service";
import { useAppSelector } from "@/redux/reduxHooks";
import collaboratorsServices from "@/services/collaborators/collaborators.service";

import styles from "./InvitationDropDown.module.scss";

const InvitationDropDown = () => {
    const router = useRouter();

    const [invitations, setInvitations] = useState<IEmployerInvitationDto[]>(
        []
    );
    const [showDropdown, setShowDropdown] = React.useState(false);
    const dropDownRef = useOutsideClick<HTMLDivElement>(() =>
        setShowDropdown(false)
    );
    const queryClient = useQueryClient();
    const { data: invitationRes } = useQuery({
        queryKey: ["invitations"],
        queryFn: collaboratorsServices.getCollabInvitations,
    });
    const acceptInvitationMutation = useMutation({
        mutationFn: (jobPostId: number) =>
            collaboratorsServices.acceptJobCollabInvitation(jobPostId),
        onSuccess: res => {
            toast.success(res.message);
            queryClient.invalidateQueries({
                queryKey: ["invitations"],
            });
        },
        onError: error => {
            console.error(error);
            toast.error("Accept invitation failure");
        },
    });

    const handleAcceptInvitation = async (jobPostId: number) => {
        try {
            acceptInvitationMutation.mutate(jobPostId);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchInvitaionList = async () => {
            try {
                const collabRes =
                    await collaboratorsServices.getCollabInvitations();
                console.log(collabRes);
                setInvitations(collabRes.data);
            } catch (error) {
                toast.error("Fetch invitations error");
            }
        };
        fetchInvitaionList();
    }, []);

    return (
        <div ref={dropDownRef} className="relative text-left">
            <button
                type="button"
                className="relative p-1 rounded-md border border-neutral-400"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <EnvelopeIcon className="w-6 h-w-6" />
                {invitations.length > 0 && (
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full top-0 right-0 -translate-y-1/2 translate-x-1/2 dark:border-gray-900">
                        {invitations.length}
                    </div>
                )}
            </button>
            <ul
                className={`${styles.dropdown__wrapper} ${
                    showDropdown ? styles.entering : styles.leaving
                }`}
            >
                {invitationRes?.data?.map(invitation => (
                    <li key={invitation.id}>
                        <div
                            className={styles.dropdown__item}
                            onClick={() => setShowDropdown(false)}
                        >
                            <div>
                                <InboxIcon className="w-6 h-6" />
                            </div>
                            <div className="ml-3">
                                <strong className="block mb-1">
                                    {invitation.invitationTypeName.charAt(0) +
                                        invitation.invitationTypeName
                                            .slice(1)
                                            .toLowerCase()
                                            .replace("_", " ")}
                                </strong>
                                <p className="mb-3">
                                    {invitation.organizationName} have invited
                                    you to coorperate in recruitment process
                                </p>
                                <div>
                                    <button
                                        type="button"
                                        className="font-medium text-blue_primary_800 hover:text-blue_primary_600 mr-4"
                                        onClick={handleAcceptInvitation.bind(
                                            null,
                                            invitation.jobPostId
                                        )}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        type="button"
                                        className="font-medium hover:text-neutral-500"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        Dismiss
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InvitationDropDown;
