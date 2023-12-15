"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { DeleteModal, Portal } from "@/components";
import { IOrgEmployerDto, Roles } from "@/services";
import employerOrgServices from "@/services/employer-organization/employer-organization.service";
import { handleError } from "@/helpers";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import styles from "./MemberList.module.scss";

type MemberCardProps = {
    index: number;
    employer: IOrgEmployerDto;
};

const MemberCard: React.FC<MemberCardProps> = ({ employer, index }) => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "org-members");

    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationKey: ["delete-employer"],
        mutationFn: (id: string) => employerOrgServices.deleteByIdAsync(id),
        onSuccess: res => {
            toast.success(res.message);
            queryClient.invalidateQueries({
                queryKey: ["employers-organization"],
            });
        },
        onError: error => {
            handleError(error);
        },
    });

    return (
        <>
            <Portal>
                <DeleteModal
                    title={t("remove_employer")}
                    description={`Are you sure you want to remove this ${
                        employer.employerDto.firstName
                    } ${
                        employer.employerDto.lastName ?? ""
                    }? All of your data will be permanently removed. This action cannot be undone.`}
                    show={showDeleteAlert}
                    onClose={() => setShowDeleteAlert(false)}
                    onConfirm={() =>
                        deleteMutation.mutate(employer.employerDto.id)
                    }
                />
            </Portal>
            <tr key={employer.id}>
                <td className="hidden lg:table-cell">
                    <div className={styles.row__wrapper}>{index + 1}</div>
                </td>
                <td>
                    <div
                        className={`${styles.row__wrapper} flex items-center gap-2`}
                    >
                        {employer.employerDto.firstName}{" "}
                        {employer.employerDto.lastName ?? ""}
                    </div>
                </td>
                <td className="hidden lg:table-cell">
                    <div className={styles.row__wrapper}>
                        {employer.employerDto.email}
                    </div>
                </td>

                <td className="hidden lg:table-cell">
                    <div className={styles.row__wrapper}>
                        {employer.role.name
                            .split("_")
                            .map(
                                item =>
                                    item.charAt(0).toUpperCase() +
                                    item.toLowerCase().substring(1)
                            )
                            .join(" ")}
                    </div>
                </td>
                <td>
                    <div className={styles.row__wrapper}>
                        {employer.role.name !== Roles.ORGANIZATION_ADMIN && (
                            <button
                                type="button"
                                className="group"
                                onClick={() => setShowDeleteAlert(true)}
                            >
                                <TrashIcon className="text-red-500 group-hover:text-red-700 w-6 h-6" />
                            </button>
                        )}
                    </div>
                </td>
            </tr>
        </>
    );
};

export default MemberCard;
