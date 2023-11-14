"use client";

import { EnvelopeIcon, InboxIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    const token = useAppSelector(state => state.auth.token);

    const [invitations, setInvitations] = useState<IEmployerInvitationDto[]>(
        []
    );
    const [showDropdown, setShowDropdown] = React.useState(false);
    const dropDownRef = useOutsideClick<HTMLDivElement>(() =>
        setShowDropdown(false)
    );
    const queryClient = useQueryClient();
    const acceptInvitationMutation = useMutation({
        mutationFn: (orgId: string) =>
            employerOrgServices.acceptEmployerInvitationListAsync(orgId),
        onSuccess: res => {
            toast.success(res.message);
            queryClient.invalidateQueries({
                queryKey: ["joined-owned-organizations"],
            });
        },
        onError: error => {
            console.error(error);
            toast.error("Accept invitation failure");
        },
    });

    const handleAcceptInvitation = async (orgId: string, subdomain: string) => {
        acceptInvitationMutation.mutate(orgId);
        await delayFunc(500);
        handleRedirectOnAccept(orgId, subdomain);
    };

    const handleRedirectOnAccept = async (orgId: string, subdomain: string) => {
        try {
            const res = await authServices.getOrgAccessToken(orgId);
            if (
                process.env.NEXT_PUBLIC_ROOT_DOMAIN?.includes(
                    "localhost" || process.env.NODE_ENV === "development"
                )
            )
                router.replace(
                    `${window.location.protocol}//${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}?accessToken=${res.data.accessToken}`
                );
            else {
                Cookies.set("hirelight_access_token", res.data.accessToken, {
                    domain: `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
                    sameSite: "None",
                    secure: true,
                });
                router.replace(
                    `${window.location.protocol}//${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/backend`
                );
            }
        } catch (error) {
            toast.error("Redirect failure");
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchInvitaionList = async () => {
            try {
                const res =
                    await employerOrgServices.getEmployerInvitationListAsync();

                setInvitations(res.data);
            } catch (error) {
                toast.error("Fetch invitations error");
            }
        };
        if (token) fetchInvitaionList();
    }, [token]);

    if (!token) return null;

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
                {invitations?.map(invitation => (
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
                                    Join org invitation
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
                                            invitation.organizationId,
                                            invitation.organizationSubdomain
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
