"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useRef } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setSelectCandidate } from "@/redux/slices/candidates.slice";
import { IJobPostProfileDto } from "@/services";
import { IAppFormSection } from "@/interfaces";

type CandidateCardProps = {
    profile: IJobPostProfileDto;
};

const CandidateCard: React.FC<CandidateCardProps> = ({ profile }) => {
    const { jobId, assessmentId } = useParams();
    const dispatch = useAppDispatch();
    const selectedCandidates = useAppSelector(
        state => state.candidates.selectedCandidates
    );
    const parsedContent = useRef<IAppFormSection[]>(
        JSON.parse(profile.content)
    );

    return (
        <Link
            href={`/backend/jobs/${jobId}/hiring-process/${assessmentId}/candidate/${profile.candidateId}`}
        >
            <div className="p-4 xl:px-6">
                <div className="flex items-start gap-3">
                    <label
                        htmlFor={`select-candidate-${profile.candidateId}`}
                        className="pt-3 mr-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                        onClick={e => e.stopPropagation()}
                    >
                        <input
                            id={`select-candidate-${profile.candidateId}`}
                            type="checkbox"
                            value="all"
                            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                            checked={
                                selectedCandidates.find(
                                    (item, iIndex) =>
                                        item === profile.candidateId
                                ) !== undefined
                            }
                            onChange={e =>
                                dispatch(
                                    setSelectCandidate(profile.candidateId)
                                )
                            }
                        />
                    </label>
                    <div className="w-12 h-12 rounded-full bg-blue-400"></div>
                    <div className="flex-1 flex flex-col items-start text-sm text-neutral-700">
                        <div className="grid">
                            <h3 className="text-lg font-semibold">{`${profile.firstName} ${profile.lastName}`}</h3>
                            <p>
                                {parsedContent.current[0].fields.find(
                                    item => item.id === "headline"
                                )?.value ?? ""}
                            </p>
                        </div>
                        <div>
                            <p>At {"<assessment>"} stage</p>
                        </div>
                        <div>
                            <span>4 days ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CandidateCard;
