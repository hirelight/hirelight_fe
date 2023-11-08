import { Metadata } from "next";
import React from "react";
import { cookies } from "next/headers";
import Image from "next/image";
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

import endpoints from "@/utils/constants/service-endpoint";
import { checkResErr } from "@/helpers";
import { IOrganizationDto } from "@/services/organizations/organizations.interface";
import logo from "@/app/icon.svg";

import JoinedOrgList from "./components/JoinedOrgList";

export const metadata: Metadata = {
    title: "Hirelight - Welcome",
};

const fetchOwnedOrgs = async (token: string): Promise<IOrganizationDto[]> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}${endpoints.ORGANIZATIONS}/owned`,
        {
            method: "GET",
            cache: "no-store",
            headers: {
                mode: "cors",
                credentials: "same-origin",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const jsonRes = await res.json();
    console.log(jsonRes);

    checkResErr(jsonRes);

    return jsonRes.data;
};

const fetchJoinedOrgs = async (token: string): Promise<IOrganizationDto[]> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}${endpoints.ORGANIZATIONS}/joined`,
        {
            method: "GET",
            cache: "no-store",
            headers: {
                mode: "cors",
                credentials: "same-origin",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const jsonRes = await res.json();
    console.log(jsonRes);

    checkResErr(jsonRes);

    return jsonRes.data;
};

const getJoinedOrgList = async (token: string): Promise<IOrganizationDto[]> => {
    const [ownedOrgs, joinedOrgs] = await Promise.all([
        fetchOwnedOrgs(token),
        fetchJoinedOrgs(token),
    ]);

    const orgMap = new Map();

    ownedOrgs?.forEach(org => {
        if (!orgMap.has(org.id)) orgMap.set(org.id, org);
    });

    joinedOrgs?.forEach(org => {
        if (!orgMap.has(org.id)) orgMap.set(org.id, org);
    });

    return Array.from(orgMap.values());
};

const SelectOrgPage = async () => {
    const accessToken = cookies().get("hirelight_access_token");
    if (!accessToken) redirect("login");

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["joined-owned-organizations"],
        queryFn: () => getJoinedOrgList(accessToken.value),
    });

    return (
        <div className="min-w-[540px] relative bg-white shadow-lg rounded-md p-8 mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 border border-gray-300 rounded-full overflow-hidden">
                <Image
                    src={logo}
                    alt="Hirelight Logo"
                    className="w-full h-auto object-cover"
                />
            </div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <JoinedOrgList />
            </HydrationBoundary>
            {/* <div className="mt-8 text-sm text-center relative flex flex-col items-center">
            <p className="text-gray-500">{login_page.dont_have_account}</p>
            <Link
                href={"/signup"}
                className="block max-w-[280px] font-semibold text-blue-600 hover:cursor-pointer hover:underline"
            >
                {login_page.btn.signup.replace("{{days}}", "15")}
            </Link>
        </div> */}
        </div>
    );
};

export default SelectOrgPage;
