"use client";

import { EnvelopeIcon, InboxIcon } from "@heroicons/react/24/outline";
import React from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useOutsideClick } from "@/hooks/useClickOutside";
import collaboratorsServices from "@/services/collaborators/collaborators.service";
import { useAppSelector } from "@/redux/reduxHooks";
import { handleError } from "@/helpers";
import { useI18NextTranslation } from "@/utils/i18n/client";

import { Locale } from "../../../../../../i18n.config";

import styles from "./InvitationDropDown.module.scss";

const InvitationDropDown = () => {
    const { lang } = useParams();

    const { t } = useI18NextTranslation(lang as Locale, "domain-page", {
        keyPrefix: "components.invitation_dropdown",
    });

    const authUser = useAppSelector(state => state.auth.authUser);

    const [showDropdown, setShowDropdown] = React.useState(false);
    const dropDownRef = useOutsideClick<HTMLDivElement>(() =>
        setShowDropdown(false)
    );
    const queryClient = useQueryClient();
    const { data: invitationRes } = useQuery({
        queryKey: ["invitations", authUser ? authUser.userId : ""],
        queryFn: collaboratorsServices.getCollabInvitations,
    });
    const acceptInvitationMutation = useMutation({
        mutationFn: (jobPostId: string) =>
            collaboratorsServices.acceptJobCollabInvitation(jobPostId),
        onSuccess: async res => {
            await queryClient.invalidateQueries({
                queryKey: ["invitations"],
            });
            toast.success(res.message, {
                position: "bottom-right",
                autoClose: 1500,
            });
        },
        onError: error => {
            handleError(error);
        },
    });

    const handleAcceptInvitation = async (jobPostId: string) => {
        try {
            await acceptInvitationMutation.mutateAsync(jobPostId);
            setShowDropdown(false);
        } catch (error) {
            handleError(error);
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
                {invitationRes && invitationRes?.data.length > 0 && (
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full top-0 right-0 -translate-y-1/2 translate-x-1/2 dark:border-gray-900">
                        {invitationRes?.data.length}
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
                        <div className={styles.dropdown__item}>
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
                                    {invitation.organizationName}{" "}
                                    {t("collab_message")}
                                </p>
                                <div>
                                    <button
                                        type="button"
                                        className="font-medium text-blue_primary_800 hover:text-blue_primary_600 mr-4 disabled:cursor-not-allowed disabled:opacity-80"
                                        disabled={
                                            acceptInvitationMutation.isPending
                                        }
                                        onClick={handleAcceptInvitation.bind(
                                            null,
                                            invitation.jobPostId
                                        )}
                                    >
                                        {t("button.accept")}
                                    </button>
                                    <button
                                        type="button"
                                        className="font-medium hover:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-80"
                                        disabled={
                                            acceptInvitationMutation.isPending
                                        }
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        {t("button.dismiss")}
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
