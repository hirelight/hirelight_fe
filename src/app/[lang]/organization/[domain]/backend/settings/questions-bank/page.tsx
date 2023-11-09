import { Metadata } from "next";
import React from "react";
import { cookies } from "next/headers";
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";

import questionAnswerServices from "@/services/questions/questions.service";
import { checkResErr } from "@/helpers/resErrHelpers";

import QuestionList from "./components/QuestionList";

export const metadata: Metadata = {
    title: "Hirelight - Question bank - Company",
};

const fetchDatas = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/question-answers`,
        {
            method: "GET",
            cache: "no-store",
            headers: {
                mode: "cors",
                credentials: "same-origin",
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                    cookies().get("hirelight_access_token")!!.value
                }`,
            },
        }
    );
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const jsonRes = await res.json();

    checkResErr(jsonRes);

    return jsonRes.data;
};

const QuestionsBank = async () => {
    return (
        <div className="bg-white rounded-md shadow-md p-4 xl:px-6">
            <QuestionList />
        </div>
    );
};

export default QuestionsBank;
