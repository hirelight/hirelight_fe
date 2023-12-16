"use client";

import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

import { useAppSelector } from "@/redux/reduxHooks";
import organizationsServices from "@/services/organizations/organizations.service";
import { DoubleRingLoading } from "@/components";

const SubscriptionMiddleware = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { lang } = useParams();
    const router = useRouter();
    const pathname = usePathname();

    const { authUser } = useAppSelector(state => state.auth);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        const checkOrgSubscription = async (orgId: string) => {
            try {
                const orgDetail =
                    await organizationsServices.getByIdAsync(orgId);
                if (
                    moment(orgDetail.data.subscriptionExpiredTime).isBefore(
                        moment()
                    )
                ) {
                    if (!pathname.includes("billing"))
                        router.push(
                            `/${lang}/backend/settings/billing?subscriptionEnd=true`
                        );
                    else setPageLoading(false);
                } else setPageLoading(false);
            } catch (error) {
                console.error(error);
                setPageLoading(false);
            }
        };
        if (authUser && authUser.organizationId) {
            checkOrgSubscription(authUser.organizationId);
        } else setPageLoading(false);
    }, [authUser, lang, pathname, router]);
    if (pageLoading)
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <DoubleRingLoading className="w-28 h-28" />
            </div>
        );
    return <>{children}</>;
};

export default SubscriptionMiddleware;
