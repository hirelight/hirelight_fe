"use client";

import React, { useState } from "react";
import Image from "next/image";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import Link from "next/link";
import { useParams } from "next/navigation";

import { IQuesAnsSetDto, IQuestionAnswerDto } from "@/services";
import { DeleteModal, Portal } from "@/components";
import questionAnsSetServices from "@/services/question-sets/question-sets.service";
import logo from "@/app/icon.svg";

type QuestionSetCardProps = {
    data: Omit<IQuesAnsSetDto, "content"> & {
        questions: IQuestionAnswerDto[];
    };
};

const QuestionSetCard: React.FC<QuestionSetCardProps> = ({ data }) => {
    const { lang } = useParams();

    const [showDelete, setShowDelete] = useState(false);

    const handleDeleteSet = async (id: string) => {
        try {
            const res = await questionAnsSetServices.deleteByIdAsync(id);
            toast.success(res.message);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Portal>
                <DeleteModal
                    title="Delete question"
                    description="Are you sure you want to delete this question? All of your data will be permanently removed. This action cannot be undone."
                    show={showDelete}
                    onClose={() => setShowDelete(false)}
                    onConfirm={() => handleDeleteSet(data.id)}
                />
            </Portal>
            <div className="p-6 bg-white rounded-md drop-shadow-lg flex gap-6 hover:bg-slate-100 relative">
                <div className="absolute right-6 top-6 flex flex-col gap-4">
                    <button
                        type="button"
                        className="w-6 h-6  text-red-500 hover:text-red-700"
                        onClick={e => {
                            e.stopPropagation();
                            setShowDelete(true);
                        }}
                    >
                        <TrashIcon />
                    </button>
                    <Link
                        href={`/${lang}/backend/settings/question-sets/${data.id}/edit`}
                        className="w-6 h-6  text-blue_primary_600 hover:text-blue_primary_800"
                    >
                        <EyeIcon />
                    </Link>
                </div>
                <div className="w-20 aspect-square rounded-full overflow-hidden">
                    <Image alt="set logo" src={logo} width={80} height={80} />
                </div>
                <div className="flex flex-col justify-between">
                    <h3 className="text-lg font-semibold">{data.name}</h3>
                    <p className="text-sm flex items-center gap-10 text-gray-500">
                        <span>
                            Easy:{" "}
                            <span>
                                {
                                    data.questions.filter(
                                        item => item.difficulty === 1
                                    ).length
                                }
                            </span>
                        </span>

                        <span>
                            Medium:{" "}
                            <span>
                                {
                                    data.questions.filter(
                                        item => item.difficulty === 2
                                    ).length
                                }
                            </span>
                        </span>

                        <span>
                            Hard:{" "}
                            <span>
                                {
                                    data.questions.filter(
                                        item => item.difficulty === 3
                                    ).length
                                }
                            </span>
                        </span>

                        <span>
                            Advance:{" "}
                            <span>
                                {
                                    data.questions.filter(
                                        item => item.difficulty === 4
                                    ).length
                                }
                            </span>
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default QuestionSetCard;
