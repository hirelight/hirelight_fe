"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setSelectCandidate } from "@/redux/slices/candidates.slice";
import { IJobPostAppAssDetailDto } from "@/services";

type CandidateCardProps = {
    profile: IJobPostAppAssDetailDto;
};

const CandidateCard: React.FC<CandidateCardProps> = ({ profile }) => {
    const { jobId, assessmentId } = useParams();
    const dispatch = useAppDispatch();
    const selectedCandidates = useAppSelector(
        state => state.candidates.selectedCandidates
    );

    return (
        <Link
            href={`/backend/jobs/${jobId}/hiring-process/${assessmentId}/candidate/${profile.applicantProfileId}`}
        >
            <div className="p-4 xl:px-6">
                <div className="flex items-start gap-3">
                    <label
                        htmlFor={`select-candidate-${profile.id}`}
                        className="pt-3 mr-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                        onClick={e => e.stopPropagation()}
                    >
                        <input
                            id={`select-candidate-${profile.applicantProfile.candidateId}`}
                            type="checkbox"
                            value="all"
                            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                            checked={
                                selectedCandidates.find(
                                    item =>
                                        item ===
                                        profile.applicantProfile.candidateId
                                ) !== undefined
                            }
                            onChange={e =>
                                dispatch(
                                    setSelectCandidate(
                                        profile.applicantProfile.candidateId
                                    )
                                )
                            }
                        />
                    </label>
                    {/* <div className="w-12 h-12 rounded-full bg-white border border-gray-300 overflow-hidden">
                        <Image
                            alt="Candidate avatar"
                            src={
                                profile.content.form_structure[0].fields.find(
                                    item => item.id === "avatar"
                                )?.value.value ?? ""
                            }
                            width={500}
                            height={500}
                            className="h-full w-auto object-cover"
                        />
                    </div> */}
                    <div className="flex-1 flex flex-col items-start text-sm text-neutral-700">
                        <div className="grid">
                            <h3 className="text-lg font-semibold">{`${profile.applicantProfile.firstName} ${profile.applicantProfile.lastName}`}</h3>
                            <p>
                                {JSON.parse(
                                    profile.applicantProfile.content
                                ).form_structure[0].fields.find(
                                    (item: any) => item.id === "headline"
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
