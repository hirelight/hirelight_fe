import React from "react";
import { cookies } from "next/headers";

import { checkResErr } from "@/helpers/resErrHelpers";

import EditQuestionForm from "./components/EditForm";

const getQuestionData = async (id: number) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/question-answers/${id}`,
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

const EditQuestion = async ({ params }: any) => {
    const { questionId } = params;
    const data = await getQuestionData(parseInt(questionId));

    return (
        <div className="w-full bg-white rounded-md shadow-md p-4 xl:px-6">
            <h1 className="text-xl text-blue_primary_800 font-semibold text-center mb-4">
                Edit multiple choice question
            </h1>
            <EditQuestionForm data={data} />
        </div>
    );
};

export default EditQuestion;
