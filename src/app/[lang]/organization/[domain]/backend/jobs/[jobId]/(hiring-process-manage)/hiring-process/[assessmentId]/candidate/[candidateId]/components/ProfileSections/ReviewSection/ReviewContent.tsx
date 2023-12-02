"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import {
    BookmarkSlashIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import Image from "next/image";
import moment from "moment";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import evaluationServices from "@/services/evaluation/evaluation.service";
import { Button } from "@/components";
import { ICreateEvaluationDto } from "@/services/evaluation/evaluation.interface";
import { useAppSelector } from "@/redux/reduxHooks";
import collaboratorsServices from "@/services/collaborators/collaborators.service";

import styles from "./styles.module.scss";
import AddEvaluationSection from "./AddEvaluationSection";
import EvaluationCard, { getRating } from "./EvaluationCard";

const ReviewContent = () => {
    const { candidateId } = useParams();

    const [showAdd, setShowAdd] = useState(false);
    const applicantAssessmentDetail = useAppSelector(
        state => state.applicantAssessmentDetail.data!!
    );
    const [selectedDetailId, setSelectedDetailId] = useState(
        applicantAssessmentDetail.id as string
    );
    const { data: querRes, isLoading: otherLoading } = useQuery({
        queryKey: ["profile-evaluations", candidateId],
        queryFn: () =>
            evaluationServices.getListByProfileId(candidateId as string),
    });
    const { data: curDetailEvaluate, isLoading: curLoading } = useQuery({
        queryKey: ["assessment-evaluations", applicantAssessmentDetail.id],
        queryFn: () =>
            evaluationServices.getListByApplicantAssessmentDetailId(
                applicantAssessmentDetail.id as string
            ),
    });

    const handleShowAddEvaluation = async (id: string) => {
        setSelectedDetailId(id);
        setShowAdd(true);
    };

    if (curLoading || otherLoading)
        return (
            <div className="mt-4">
                <EvaluationSkeleton />
            </div>
        );

    return (
        <div className="mt-4">
            {!curDetailEvaluate?.data.length ? (
                <div className="flex justify-center items-center p-6">
                    <BookmarkSlashIcon className="w-16 h-16 text-neutral-700" />
                    <div className="ml-6 p-2">
                        <h3 className="mb-2 text-lg font-semibold">
                            There is no evaluations for current assessment yet
                        </h3>
                        <p className="mb-6 text-sm">
                            Evaluations you or other team members add will
                            appear here.
                        </p>
                        <Button onClick={() => setShowAdd(true)}>
                            Add evaluation
                        </Button>
                    </div>
                </div>
            ) : (
                <div>
                    <h3 className="text-lg text-neutral-700 mb-2 font-semibold">
                        Current submission
                    </h3>
                    <section
                        key={applicantAssessmentDetail.id}
                        className="text-sm"
                    >
                        <div className="pb-6 pt-4 border-b border-gray-300 flex gap-4">
                            <h4 className="text-base font-semibold">
                                {applicantAssessmentDetail.assessment.name}
                            </h4>

                            <div>
                                {Array.from(
                                    curDetailEvaluate.data
                                        ?.reduce((prev, cur) => {
                                            if (!prev.has(cur.rating)) {
                                                prev.set(cur.rating, {
                                                    value: cur,
                                                    count: 1,
                                                });
                                            } else {
                                                prev.set(cur.rating, {
                                                    value: cur,
                                                    count:
                                                        prev.get(cur.rating)
                                                            .count + 1,
                                                });
                                            }

                                            return prev;
                                        }, new Map())
                                        .values()
                                ).map(item => (
                                    <div
                                        key={item.value.rating}
                                        className="inline-flex gap-1 mr-3"
                                    >
                                        {getRating(
                                            item.value.rating,
                                            <span>{item.count}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <ul>
                            {curDetailEvaluate.data?.map(evaluation => (
                                <li
                                    key={evaluation.id}
                                    className="py-6 border-b border-gray-300"
                                >
                                    <EvaluationCard data={evaluation} />
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            )}

            <ul>
                {querRes &&
                    querRes.data.filter(
                        item =>
                            item.assessmentEvaluations.length > 0 &&
                            item.id !== applicantAssessmentDetail.id
                    ).length > 0 && (
                        <h3 className="text-lg text-neutral-700 mb-2 font-semibold">
                            Previous submissions
                        </h3>
                    )}
                {querRes?.data
                    .filter(
                        item =>
                            item.assessmentEvaluations.length > 0 &&
                            item.id !== applicantAssessmentDetail.id
                    )
                    .map(item => (
                        <section key={item.id} className="text-sm">
                            <div className="pb-6 pt-4 border-b border-gray-300 flex gap-4">
                                <h4 className="text-base font-semibold">
                                    {item.assessment.name}
                                </h4>

                                <div>
                                    {Array.from(
                                        item.assessmentEvaluations
                                            ?.reduce((prev, cur) => {
                                                if (!prev.has(cur.rating)) {
                                                    prev.set(cur.rating, {
                                                        value: cur,
                                                        count: 1,
                                                    });
                                                } else {
                                                    prev.set(cur.rating, {
                                                        value: cur,
                                                        count:
                                                            prev.get(cur.rating)
                                                                .count + 1,
                                                    });
                                                }

                                                return prev;
                                            }, new Map())
                                            .values()
                                    ).map(item => (
                                        <div
                                            key={item.value.rating}
                                            className="inline-flex gap-1 mr-3"
                                        >
                                            {getRating(
                                                item.value.rating,
                                                <span>{item.count}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <ul>
                                {item.assessmentEvaluations?.map(evaluation => (
                                    <li
                                        key={evaluation.id}
                                        className="py-6 border-b border-gray-300"
                                    >
                                        <EvaluationCard data={evaluation} />
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
            </ul>

            <button
                type="button"
                className="text-sm text-blue_primary_600 font-semibold hover:underline hover:text-blue_primary_800 my-6"
                onClick={handleShowAddEvaluation.bind(
                    null,
                    applicantAssessmentDetail.id
                )}
            >
                Add evaluation for this candidate
            </button>

            {/* <Menu as="div" className="relative inline-block text-left py-6">
                <div>
                    <Menu.Button className="text-sm text-blue_primary_600 font-semibold hover:underline hover:text-blue_primary_800">
                        Add evaluation for this candidate
                    </Menu.Button>
                </div>
                <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        as="div"
                        id="hello-world"
                        className="absolute right-0 top-0 -translate-y-full z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white drop-shadow-xl ring-1 ring-black/5 focus:outline-none"
                    >
                        <div className="px-1 py-1 ">
                            {querRes?.data.map(item => (
                                <Menu.Item key={item.id}>
                                    {({ active }) => (
                                        <button
                                            type="button"
                                            className={`${
                                                active
                                                    ? "bg-blue_primary_100"
                                                    : ""
                                            } group flex w-full text-neutral-700 items-center rounded-md px-2 py-2 font-semibold text-sm`}
                                            onClick={handleShowAddEvaluation.bind(
                                                null,
                                                item.id
                                            )}
                                        >
                                            {item.assessment.name}
                                        </button>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu> */}

            <LazyMotion features={domAnimation}>
                <AnimatePresence>
                    {showAdd && (
                        <AddEvaluationSection
                            applicantAssessmentDetailId={selectedDetailId}
                            close={() => setShowAdd(false)}
                        />
                    )}
                </AnimatePresence>
            </LazyMotion>
        </div>
    );
};

export default ReviewContent;

const EvaluationSkeleton = () => {
    return (
        <ul>
            {new Array(2).fill("").map((_, index) => (
                <section key={index} className="animate-pulse">
                    <div className="pb-6 pt-4 border-b border-gray-300 flex gap-4">
                        <h4 className="text-base font-semibold h-6 w-20 bg-slate-300"></h4>

                        <div className="h-5 w-14"></div>
                    </div>

                    <ul>
                        {new Array(4).fill("").map((x, xIndex) => (
                            <li
                                key={xIndex}
                                className="py-6 border-b border-gray-300"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-300"></div>
                                    <div className="flex-1">
                                        <div className="h-5 w-14 bg-slate-200"></div>
                                        <div className="h-5 w-10 bg-slate-200"></div>
                                    </div>
                                </div>
                                <p className="h-5 w-[330px] bg-slate-200"></p>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </ul>
    );
};
