"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setSelectCandidate } from "@/redux/slices/candidates.slice";

const CandidateCard = ({ index }: any) => {
    const { jobId, assessmentId } = useParams();
    const dispatch = useAppDispatch();
    const selectedCandidates = useAppSelector(
        state => state.candidates.selectedCandidates
    );

    return (
        <Link
            href={`/backend/jobs/${jobId}/hiring-process/${assessmentId}/candidate/${index}`}
        >
            <div className="p-4 xl:px-6">
                <div className="flex items-start gap-3">
                    <label
                        htmlFor="select-all-candidates"
                        className="pt-3 mr-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                        onClick={e => e.stopPropagation()}
                    >
                        <input
                            id="select-all-candidates"
                            type="checkbox"
                            value="all"
                            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                            checked={
                                selectedCandidates.find(
                                    (item, iIndex) => item === index
                                ) !== undefined
                            }
                            onChange={e => dispatch(setSelectCandidate(index))}
                        />
                    </label>
                    <div className="w-12 h-12 rounded-full bg-blue-400"></div>
                    <div className="flex-1 flex flex-col items-start text-sm text-neutral-700">
                        <div className="grid">
                            <h3 className="text-lg font-semibold">Full name</h3>
                            <p>Headlines</p>
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
