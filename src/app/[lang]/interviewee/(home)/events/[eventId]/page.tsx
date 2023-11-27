"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import {
    CheckIcon,
    MinusIcon,
    QuestionMarkCircleIcon,
    UserCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import { RadioGroup } from "@headlessui/react";
import { toast } from "react-toastify";

import meetingServices from "@/services/meeting/meeting.service";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Button, ButtonOutline, CustomInput } from "@/components";
import { useAppSelector } from "@/redux/reduxHooks";
import { MeetingStatus } from "@/services";

import styles from "./styles.module.scss";
import RescheduleModal from "./components/RescheduleModal";

const plans = [
    {
        name: "Accept",
        value: "MEETING_ACCEPTED",
    },
    {
        name: "Decline",
        value: "MEETING_DECLINED",
    },
    {
        name: "Reschedule",
        value: "MEETING_SCHEDULING",
    },
];

const EventInfoPage = () => {
    const { eventId } = useParams();

    const { authUser } = useAppSelector(state => state.auth);

    const {
        data: meeting,
        isLoading,
        isSuccess,
    } = useQuery({
        queryKey: ["meeting", eventId],
        queryFn: () => meetingServices.getMeetingById(eventId as string),
    });
    const [selected, setSelected] = useState<(typeof plans)[0]>();
    const [showReschedule, setShowSchedule] = useState(false);

    const getImageNode = (url?: string) => {
        if (url)
            return (
                <Image
                    src={url}
                    alt="Collaborator avatar"
                    width={30}
                    height={30}
                    className="w-full h-full rounded-full object-cover"
                />
            );
        else
            return (
                <div className="w-full h-full rounded-full text-neutral-600">
                    <UserCircleIcon />
                </div>
            );
    };

    const handleResponse = async (val: string) => {
        try {
            switch (val) {
                case "MEETING_ACCEPTED": {
                    const res = await meetingServices.candidateAcceptMeeting(
                        meeting?.data.id ?? ""
                    );
                    toast.success(res.message);
                    break;
                }

                case "MEETING_DECLINED": {
                    const res = await meetingServices.candidateDeclineMeeting(
                        meeting?.data.id ?? ""
                    );
                    toast.success(res.message);
                    break;
                }
                case "MEETING_SCHEDULING": {
                    setShowSchedule(true);
                    break;
                }
            }
        } catch (error: any) {
            toast.error(error.message ? error.message : "");
        }
    };

    useEffect(() => {
        if (meeting) {
            const isExist = plans.find(
                item => item.value === meeting.data.status
            );
            if (isExist) setSelected(isExist);
        }
    }, [meeting]);

    if (isLoading || !isSuccess)
        return (
            <div className="flex justify-center items-center">
                <LoadingIndicator />
            </div>
        );

    return (
        <main className="bg-slate-100">
            <RescheduleModal
                meetingId={meeting.data.id}
                show={showReschedule}
                close={() => setShowSchedule(false)}
            />
            <header className="bg-white flex flex-col items-center justify-center p-6 mb-8 drop-shadow-lg">
                <h1 className="uppercase text-2xl text-blue_primary_700">
                    FPT Uni
                </h1>

                <h3 className="font-semibold text-xl text-neutral-700 mt-4 mb-2">
                    Frontend Developer
                </h3>
                <p className="text-sm text-gray-500">
                    Ho Chi Minh City, Vietnam · Temporary
                </p>
            </header>

            <div className="flex justify-center max-w-screen-xl mx-auto">
                <div className="bg-white w-full max-w-4xl rounded-md shadow-lg p-6">
                    <h3 className="text-xl text-neutral-700 font-semibold mb-6">
                        {meeting.data.name}
                    </h3>
                    <div className={styles.subsection}>
                        <p className="py-3 px-4 mb-6">
                            Scheduled on{" "}
                            <strong>
                                {moment
                                    .utc(meeting.data.startTime)
                                    .local()
                                    .format("dddd MMMM Do")}{" "}
                                at{" "}
                                {`${moment
                                    .utc(meeting.data.startTime)
                                    .local()
                                    .format("HH:mm A")} - ${moment
                                    .utc(meeting.data.endTime)
                                    .local()
                                    .format("HH:mm A")}`}
                            </strong>
                        </p>

                        <h3 className="uppercase">Meeting link</h3>

                        <Link
                            href={meeting.data.meetingLink}
                            className="text-blue_primary_800 font-semibold hover:underline"
                        >
                            {meeting.data.meetingLink}
                        </Link>
                    </div>

                    {meeting.data.candidate && (
                        <div className={styles.subsection}>
                            <div className="flex items-center gap-3">
                                <div className="relative w-20 h-20">
                                    {getImageNode()}
                                    <MeetingStatusBadge
                                        status={meeting.data.status}
                                    />
                                </div>
                                <span>
                                    {meeting.data.candidate.firstName +
                                        " " +
                                        (meeting.data.candidate.lastName ?? "")}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className={styles.subsection}>
                        <h3 className={styles.subsection_title}>
                            Interviewers
                        </h3>

                        <ul>
                            {meeting.data.employerMeetingRefs?.map(
                                (employer, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="relative w-20 h-20">
                                            {getImageNode()}
                                        </div>
                                        <span>
                                            {employer.employer.firstName +
                                                " " +
                                                (employer.employer.lastName ??
                                                    "")}
                                        </span>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                    <div>
                        <h3 className={styles.subsection_title}>Response</h3>
                        <div className="w-full mb-6">
                            <RadioGroup
                                value={selected}
                                onChange={val => {
                                    setSelected(val);
                                    if (val) handleResponse(val.value);
                                }}
                            >
                                <RadioGroup.Label className="sr-only">
                                    meeting response
                                </RadioGroup.Label>
                                <div className="flex gap-4">
                                    {plans.map(plan => (
                                        <RadioGroup.Option
                                            key={plan.value}
                                            value={plan}
                                            className={({ active, checked }) =>
                                                `${
                                                    active
                                                        ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
                                                        : ""
                                                }
                  ${checked ? "bg-blue_primary_700 text-white" : "bg-white"}
                    relative flex cursor-pointer rounded-lg px-4 py-2 border border-gray-300 shadow-md focus:outline-none`
                                            }
                                            onClick={() => {
                                                if (
                                                    plan.value ===
                                                    "MEETING_SCHEDULING"
                                                )
                                                    handleResponse(plan.value);
                                            }}
                                        >
                                            {({ active, checked }) => (
                                                <div className="flex w-full items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className="text-sm">
                                                            <RadioGroup.Label
                                                                as="p"
                                                                className={`font-medium  ${
                                                                    checked
                                                                        ? "text-white"
                                                                        : "text-gray-900"
                                                                }`}
                                                            >
                                                                {plan.name}
                                                            </RadioGroup.Label>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </RadioGroup.Option>
                                    ))}
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default EventInfoPage;

const MeetingStatusBadge = ({ status }: { status: MeetingStatus }) => {
    switch (status) {
        case "MEETING_ACCEPTED":
            return (
                <div className="bg-green-500 rounded-full border border-white absolute bottom-2 right-3 shadow-lg p-[0.5px]">
                    <CheckIcon className="w-3 h-3 text-white" />
                </div>
            );
        case "MEETING_DECLINED":
            return (
                <div className="bg-red-500 rounded-full border border-white absolute bottom-2 right-3 shadow-lg p-[0.5px]">
                    <XMarkIcon className="w-3 h-3 text-white" />
                </div>
            );
        case "MEETING_SCHEDULING":
            return (
                <div className="bg-amber-500 rounded-full border border-white absolute bottom-2 right-3 shadow-lg p-[0.5px]">
                    <MinusIcon className="w-3 h-3 text-white" />
                </div>
            );
        default:
            return (
                <div className="absolute bottom-2 right-3 shadow-lg">
                    <QuestionMarkCircleIcon className="w-4 h-4 rounded-full bg-white text-blue-500" />
                </div>
            );
    }
};
