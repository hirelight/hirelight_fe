"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";

import { Button, Portal } from "@/components";
import { SpinLoading } from "@/icons";
import authServices from "@/services/auth/auth.service";
import { handleError, validWorkEmail } from "@/helpers";
import organizationsServices from "@/services/organizations/organizations.service";
import { useAppSelector } from "@/redux/reduxHooks";
import { useI18NextTranslation } from "@/utils/i18n/client";

import { Locale } from "../../../../../../i18n.config";

import styles from "./JoinedOrgList.module.scss";

type JoinedOrgListProps = {};

const JoinedOrgList: React.FC<JoinedOrgListProps> = () => {
    const router = useRouter();
    const { lang } = useParams();

    const { t: _t } = useI18NextTranslation(lang as Locale, "select-org-page", {
        keyPrefix: "join_org_list",
    });

    const { authUser } = useAppSelector(state => state.auth);

    const {
        data: res,
        error,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ["joined-owned-organizations"],
        queryFn: organizationsServices.getOwnedJoinedOrganizations,
    });

    const [pageLoading, setPageLoading] = useState(false);

    const handleRedirectNewOrg = () => {
        if (authUser && validWorkEmail(authUser.emailAddress))
            router.push("organization/new");
        else toast.error(_t("error.work_email_only"));
    };

    const handleRedirect = async (orgId: string, subdomain: string) => {
        setPageLoading(true);
        try {
            const res = await authServices.getOrgAccessToken(orgId);
            router.replace(
                `${window.location.protocol}//${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${lang}/backend?accessToken=${res.data.accessToken}`
            );
        } catch (error) {
            handleError(error);
            setPageLoading(false);
        }
    };

    return (
        <div>
            <Portal>
                {pageLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[2000] w-full h-screen backdrop-brightness-50 backdrop-blur-sm flex items-center justify-center"
                    >
                        <SpinLoading className="w-32 h-32 text-blue_primary_600" />
                    </motion.div>
                )}
            </Portal>
            <div className="flex flex-col items-center gap-4">
                <h1 className={styles.title}>{_t("h1.organization_list")}</h1>

                {isLoading && <OrgListSkeleton num={3} />}
                {res && res.data.length > 0 ? (
                    <ul className="w-full">
                        {res?.data.map(org => (
                            <li
                                key={org.id}
                                className="group border border-gray-300 first:rounded-tl-md first:rounded-tr-md last:rounded-bl-md last:rounded-br-md overflow-hidden"
                            >
                                <button
                                    type="button"
                                    className="w-full p-4 flex items-center justify-betwee gap-2 text-neutral-700 group-hover:text-blue_primary_700 group-hover:bg-gray-100"
                                    onClick={handleRedirect.bind(
                                        null,
                                        org.id,
                                        org.subdomain
                                    )}
                                >
                                    <strong className="mr-auto">
                                        {org.name}
                                    </strong>
                                    {authUser &&
                                        org.ownerId.toString() ===
                                            authUser.userId && (
                                            <span className="text-sm text-gray-500 group-hover:text-blue_primary_700">
                                                {_t("span.owned")}
                                            </span>
                                        )}
                                    <span>
                                        <ChevronRightIcon className="w-5 h-5" />
                                    </span>
                                </button>
                            </li>
                        ))}
                        {!isLoading && isFetching && (
                            <li className="group border border-gray-300 first:rounded-tl-md first:rounded-tr-md last:rounded-bl-md last:rounded-br-md overflow-hidden animate-pulse p-4">
                                <div className="h-6 w-full rounded bg-slate-200"></div>
                            </li>
                        )}
                    </ul>
                ) : (
                    !isFetching && (
                        <div className="w-full flex flex-col items-center mt-2">
                            <BuildingOffice2Icon className="w-24 h-24 text-neutral-700 mb-2" />
                            <div className="text-sm text-gray-500 max-w-[80%] mb-6">
                                <p>{_t("p.empty_list")}</p>
                            </div>
                        </div>
                    )
                )}
                <Button onClick={handleRedirectNewOrg} className="!w-fit mt-4">
                    {_t("button.create_new")}
                </Button>
            </div>
        </div>
    );
};

export default JoinedOrgList;

const OrgListSkeleton = ({ num }: { num: number }) => {
    return (
        <ul className="w-full">
            {new Array(num).fill("").map((_, index) => (
                <li
                    key={index}
                    className="group border border-gray-300 first:rounded-tl-md first:rounded-tr-md last:rounded-bl-md last:rounded-br-md overflow-hidden animate-pulse p-4"
                >
                    <div className="h-6 w-full rounded bg-slate-200"></div>
                </li>
            ))}
        </ul>
    );
};
