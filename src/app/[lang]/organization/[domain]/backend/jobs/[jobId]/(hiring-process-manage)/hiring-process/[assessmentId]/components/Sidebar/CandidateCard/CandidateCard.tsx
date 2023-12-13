"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/solid";
import moment from "moment";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setSelectCandidate } from "@/redux/slices/candidates.slice";
import { ApplicationFormJSON, IJobPostAppAssDetailDto } from "@/services";

import MatchSkillsModal from "./MatchSkillsModal";

type CandidateCardProps = {
    profile: IJobPostAppAssDetailDto;
};

const CandidateCard: React.FC<CandidateCardProps> = ({ profile }) => {
    const { jobId, assessmentId, lang } = useParams();
    const router = useRouter();

    const dispatch = useAppDispatch();
    const selectedCandidates = useAppSelector(
        state => state.candidates.selectedCandidates
    );
    const applicantDetail = useAppSelector(
        state => state.applicantAssessmentDetail.data
    );
    const parsedContent = JSON.parse(
        profile.applicantProfile.content
    ) as ApplicationFormJSON;

    const [showSkills, setShowSkills] = useState(false);
    const avatar = useRef<any | undefined>(
        parsedContent.form_structure[0].fields.find(
            item => item.id === "avatar"
        )!!.value
    );
    const headline = useRef<any | undefined>(
        parsedContent.form_structure[0].fields.find(
            item => item.id === "headline"
        )
    );

    return (
        <div
            role="link"
            className="cursor-pointer"
            onClick={() =>
                router.push(
                    `/backend/jobs/${jobId}/hiring-process/${assessmentId}/candidate/${profile.applicantProfileId}`
                )
            }
        >
            <MatchSkillsModal
                skills={
                    profile.applicantProfile.keywordsMatch?.split(",") ?? []
                }
                isOpen={showSkills}
                closeModal={() => setShowSkills(false)}
            />
            <div className="p-4 xl:px-6">
                <div className="flex items-start gap-3">
                    <label
                        htmlFor={profile.id}
                        className="pt-3 mr-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                        onClick={e => e.stopPropagation()}
                    >
                        <input
                            id={profile.id}
                            type="checkbox"
                            value="all"
                            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                            checked={
                                selectedCandidates.find(
                                    item => item === profile.id
                                ) !== undefined
                            }
                            onChange={e =>
                                dispatch(setSelectCandidate(profile.id))
                            }
                        />
                    </label>
                    <div className="w-12 h-12 rounded-full bg-white border border-gray-300 overflow-hidden">
                        {avatar.current ? (
                            <Image
                                alt="Candidate avatar"
                                src={avatar.current.value ?? ""}
                                width={500}
                                height={500}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <UserIcon className="p-2 text-neutral-700" />
                        )}
                    </div>
                    <div className="flex-1 flex flex-col items-start text-sm text-neutral-700">
                        <div className="grid">
                            <h3 className="text-lg font-semibold">{`${profile.applicantProfile.firstName} ${profile.applicantProfile.lastName}`}</h3>
                            {headline.current && headline.current.value && (
                                <p>{headline.current.value}</p>
                            )}
                        </div>
                        <div className="mb-2 text-gray-500 text-xs">
                            <span>
                                {moment
                                    .utc(profile.createdTime)
                                    .locale(lang)
                                    .fromNow()}
                            </span>
                        </div>
                        {profile.applicantProfile.keywordsMatch &&
                            profile.applicantProfile.keywordsMatch.length >
                                0 && (
                                <button
                                    type="button"
                                    className="hover:underline"
                                    onClick={e => {
                                        e.stopPropagation();
                                        setShowSkills(true);
                                    }}
                                >
                                    <strong>
                                        {
                                            profile.applicantProfile.keywordsMatch.split(
                                                ","
                                            ).length
                                        }
                                    </strong>{" "}
                                    skills matched
                                </button>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateCard;
