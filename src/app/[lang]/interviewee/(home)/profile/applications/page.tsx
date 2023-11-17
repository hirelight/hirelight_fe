import React from "react";
import { cookies } from "next/headers";
import jwtDecode from "jwt-decode";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { IUserInfo } from "@/interfaces/user.interface";
import { checkResErr } from "@/helpers";
import getQueryClient from "@/utils/react-query/getQueryClient";

import ApplicantList from "./components/ApplicationList";

const fetchMyApplications = async () => {
    const token = cookies().get("hirelight_access_token");
    const decoded: IUserInfo = jwtDecode(token!!.value);
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/applicant-profiles/search/candidate/${decoded.userId}`,
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

const MyApplications = async () => {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["my-applications"],
        queryFn: fetchMyApplications,
    });

    return (
        <div className="w-full">
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm flex justify-center items-center pt-4 pb-6 mb-10">
                <div className="flex items-center gap-16">
                    <button
                        type="button"
                        className={`relative font-medium text-lg transition-all after:content-[""] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-0 after:bg-blue_primary_800 after:mt-2 after:rounded-full after:transition-all`}
                    >
                        Wait for response
                    </button>
                    <button
                        type="button"
                        className={`relative font-medium text-lg transition-all after:content-[""] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-0 after:bg-blue_primary_800 after:mt-2 after:rounded-full after:transition-all`}
                    >
                        In interview progress
                    </button>
                    <button
                        type="button"
                        className={`relative font-medium text-lg transition-all after:content-[""] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-0 after:bg-blue_primary_800 after:mt-2 after:rounded-full after:transition-all`}
                    >
                        Finished
                    </button>
                </div>
            </div>
            <div>
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <ApplicantList />
                </HydrationBoundary>
            </div>
        </div>
    );
};

export default MyApplications;
