"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { IQuesAnsSetDto } from "@/services";
import questionAnsSetServices from "@/services/question-sets/question-sets.service";
import LoadingIndicator from "@/components/LoadingIndicator";

import QuestionSetForm from "../../components/QuestionSetForm";

const EditQuestionSetPage = () => {
    const { questionSetId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<IQuesAnsSetDto>();

    useEffect(() => {
        const fetchQuesSetById = async (id: string) => {
            setIsLoading(true);
            try {
                const res = await questionAnsSetServices.getByIdAsync(id);

                toast.success(res.message);
                setData(res.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                toast.error("Fetch failure");
                setIsLoading(false);
            }
        };

        fetchQuesSetById(questionSetId as string);
    }, [questionSetId]);

    if (isLoading || !data)
        return (
            <div className="p-6 flex justify-center">
                <LoadingIndicator />
            </div>
        );

    return (
        <div>
            <QuestionSetForm
                data={{ ...data, questions: JSON.parse(data.content) }}
            />
        </div>
    );
};

export default EditQuestionSetPage;
