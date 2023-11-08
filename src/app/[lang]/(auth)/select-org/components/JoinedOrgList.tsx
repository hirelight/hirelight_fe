"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";

import { Button, Portal } from "@/components";
import { SpinLoading } from "@/icons";
import { IOrganizationDto } from "@/services/organizations/organizations.interface";
import authServices from "@/services/auth/auth.service";
import { validWorkEmail } from "@/helpers";
import organizationsServices from "@/services/organizations/organizations.service";

import styles from "./JoinedOrgList.module.scss";

type JoinedOrgListProps = {};

const JoinedOrgList: React.FC<JoinedOrgListProps> = () => {
    const router = useRouter();
    const token = Cookies.get("hirelight_access_token")!!;
    const decoded: any = jwtDecode(token);

    const { data: res, error } = useQuery({
        queryKey: ["joined-owned-organizations"],
        queryFn: organizationsServices.getOwnedJoinedOrganizations,
    });

    const [pageLoading, setPageLoading] = useState(false);

    const handleRedirectNewOrg = () => {
        if (validWorkEmail(decoded.emailAddress))
            router.push("/organization/new");
        else toast.error("Only work email can create organization");
    };

    const handleRedirect = async (orgId: number, subdomain: string) => {
        try {
            setPageLoading(true);
            const res = await authServices.getOrgAccessToken(orgId);
            if (process.env.NODE_ENV === "development")
                router.replace(
                    `${window.location.protocol}//${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}?accessToken=${res.data.accessToken}`
                );
            else {
                Cookies.set("hirelight_access_token", res.data.accessToken, {
                    domain: `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
                    sameSite: "strict",
                    secure: true,
                });
                router.replace(
                    `${window.location.protocol}//${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/backend`
                );
            }
        } catch (error) {
            toast.error("Redirect failure");
            console.error(error);
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
            <div className="flex flex-col gap-4">
                <h1 className={styles.title}>Organization List:</h1>

                {res?.data && res.data.length > 0 ? (
                    <ul>
                        {res.data.map(org => (
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
                                    {org.ownerId.toString() ===
                                        decoded.userId && (
                                        <span className="text-sm text-gray-500 group-hover:text-blue_primary_700">
                                            Owned
                                        </span>
                                    )}
                                    <span>
                                        <ChevronRightIcon className="w-5 h-5" />
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="w-full flex flex-col items-center">
                        <BuildingOffice2Icon className="w-24 h-24 text-neutral-700 mb-2" />
                        <div className="text-sm text-gray-500 max-w-[80%] mb-6">
                            <p>
                                You have not been member of any organization.
                                Please check your invitation or create your
                                organization!
                            </p>
                        </div>
                        <Button onClick={handleRedirectNewOrg}>
                            Create new organization
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JoinedOrgList;
