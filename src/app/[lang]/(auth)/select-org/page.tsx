import { Metadata } from "next";
import React from "react";
import Image from "next/image";

import logo from "/public/images/logo.svg";

import dynamic from "next/dynamic";

import { DoubleRingLoading } from "@/components";

import JoinedOrgList from "./components/JoinedOrgList";

const SelectOrgWrapper = dynamic(
    () => import("./components/SelectOrgWrapper"),
    {
        ssr: false,
        loading: () => (
            <div className="p-8 flex justify-center items-center">
                <DoubleRingLoading className="w-20 h-20" />
            </div>
        ),
    }
);

export const metadata: Metadata = {
    title: "Hirelight - Welcome",
};

const SelectOrgPage = async ({ params }: any) => {
    return (
        <div className="min-w-[540px] relative bg-white shadow-lg rounded-md p-8 mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 border border-gray-300 rounded-full overflow-hidden">
                <Image
                    src={logo}
                    alt="Hirelight Logo"
                    width={96}
                    height={96}
                    className="w-full h-auto object-cover"
                />
            </div>
            <SelectOrgWrapper>
                <JoinedOrgList />
            </SelectOrgWrapper>
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
