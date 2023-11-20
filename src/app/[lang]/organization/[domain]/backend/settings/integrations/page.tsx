import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

import getQueryClient from "@/utils/react-query/getQueryClient";
import endpoints from "@/utils/constants/service-endpoint";
import { checkResErr } from "@/helpers";

import IntegrationList from "./components/IntegrationList";

export const metadata: Metadata = {
    title: "Hirelight - Integration - Hirelight",
};

const fetchIntegration = async () => {
    const token = cookies().get("hirelight_access_token");
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}${endpoints.THIRDPARTY_TOKENS}`,
        {
            method: "GET",
            cache: "no-store",
            headers: {
                mode: "cors",
                credentials: "same-origin",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token!!.value}`,
            },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const jsonRes = await res.json();

    checkResErr(jsonRes);

    return jsonRes;
};

const Integrations = async () => {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["integrations"],
        queryFn: fetchIntegration,
    });

    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <IntegrationList />
            </HydrationBoundary>
        </div>
    );
};

export default Integrations;
