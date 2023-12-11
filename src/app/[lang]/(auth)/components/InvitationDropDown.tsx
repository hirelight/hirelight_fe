"use client";

import { EnvelopeIcon, InboxIcon } from "@heroicons/react/24/outline";
import React from "react";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useOutsideClick } from "@/hooks/useClickOutside";
import employerOrgServices from "@/services/employer-organization/employer-organization.service";
import authServices from "@/services/auth/auth.service";
import { useAppSelector } from "@/redux/reduxHooks";

import styles from "./InvitationDropDown.module.scss";

const InvitationDropDown = () => {
    const router = useRouter();
    const { lang } = useParams();

    const { authUser } = useAppSelector(state => state.auth);

    const [showDropdown, setShowDropdown] = React.useState(false);
    const dropDownRef = useOutsideClick<HTMLDivElement>(() =>
        setShowDropdown(false)
    );
    const queryClient = useQueryClient();
    const { data: invitationList, isLoading } = useQuery({
        queryKey: [
            "joined-owned-organizations",
            authUser ? authUser.userId : "",
        ],
        queryFn: employerOrgServices.getEmployerInvitationListAsync,
    });

    const acceptInvitationMutation = useMutation({
        mutationFn: (orgId: string) =>
            employerOrgServices.acceptEmployerInvitationListAsync(orgId),
        onSuccess: async res => {
            await queryClient.invalidateQueries({
                queryKey: [
                    "joined-owned-organizations",
                    authUser ? authUser.userId : "",
                ],
            });
            toast.success("Accept invitation successtion");
        },
        onError: error => {
            throw new Error(error.message);
        },
    });

    const handleAcceptInvitation = async (orgId: string, subdomain: string) => {
        try {
            await toast.promise(acceptInvitationMutation.mutateAsync(orgId), {
                pending: "Accepting invitation",
            });
            handleRedirectOnAccept(orgId, subdomain);
        } catch (error) {
            toast.error("Accept invitation failure");
        }
    };

    const handleRedirectOnAccept = async (orgId: string, subdomain: string) => {
        try {
            const res = await authServices.getOrgAccessToken(orgId);
            router.replace(
                `${window.location.protocol}//${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${lang}/backend?accessToken=${res.data.accessToken}`
            );
        } catch (error: any) {
            toast.error(error.message ? error.message : "Redirect failure");
        }
    };

    return (
        <div ref={dropDownRef} className="relative text-left">
            <button
                type="button"
                className="relative p-1 rounded-md border border-neutral-400"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <EnvelopeIcon className="w-6 h-w-6" />
                {invitationList && invitationList.data.length > 0 && (
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full top-0 right-0 -translate-y-1/2 translate-x-1/2 dark:border-gray-900">
                        {invitationList.data.length}
                    </div>
                )}
            </button>
            <ul
                className={`${styles.dropdown__wrapper} ${
                    showDropdown ? styles.entering : styles.leaving
                }`}
            >
                {invitationList?.data?.map(invitation => (
                    <li key={invitation.id}>
                        <div className={styles.dropdown__item}>
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
                                        className="font-medium text-blue_primary_800 hover:text-blue_primary_600 mr-4 disabled:opacity-80 disabled:cursor-not-allowed"
                                        disabled={
                                            acceptInvitationMutation.isPending
                                        }
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
                                        disabled={
                                            acceptInvitationMutation.isPending
                                        }
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
