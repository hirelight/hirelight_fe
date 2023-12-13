"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
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
import { toast } from "react-toastify";

import meetingServices from "@/services/meeting/meeting.service";
import LoadingIndicator from "@/components/LoadingIndicator";
import { MeetingStatus } from "@/services";
import { SpinLoading } from "@/icons";
import { handleError } from "@/helpers";
import { RescheduleModal, UserAvatar } from "@/components";

import styles from "./styles.module.scss";

const EventInfoPage = () => {
    const { eventId } = useParams();

    const {
        data: meeting,
        isLoading,
        isSuccess,
    } = useQuery({
        queryKey: ["meeting", eventId],
        queryFn: () => meetingServices.getMeetingById(eventId as string),
    });

    const [showReschedule, setShowSchedule] = useState(false);

    const queryClient = useQueryClient();
    const acceptMeetingMutate = useMutation({
        mutationKey: ["accept-meeting", eventId],
        mutationFn: (id: string) => meetingServices.candidateAcceptMeeting(id),
        onSuccess: async res => {
            await queryClient.invalidateQueries({
                queryKey: ["meeting", eventId],
            });
            toast.success(res.message);
        },
        onError: err => {
            handleError(err);
        },
    });

    const declineMeetingMutate = useMutation({
        mutationKey: ["accept-meeting", eventId],
        mutationFn: (id: string) => meetingServices.candidateDeclineMeeting(id),
        onSuccess: async res => {
            await queryClient.invalidateQueries({
                queryKey: ["meeting", eventId],
            });
            toast.success(res.message);
        },
        onError: err => {
            handleError(err);
        },
    });

    const handleAccept = () => {
        acceptMeetingMutate.mutate(eventId as string);
    };

    const handleDecline = () => {
        declineMeetingMutate.mutate(eventId as string);
    };

    if (isLoading || !isSuccess)
        return (
            <div className="flex justify-center items-center py-40">
                <LoadingIndicator />
            </div>
        );

    return (
        <main className="bg-slate-100">
            <RescheduleModal
                scheduleTime={
                    meeting.data.scheduleTime
                        ? JSON.parse(meeting.data.scheduleTime).map(
                              (item: any) => ({
                                  from: moment.utc(item.from).local().format(),
                                  to: moment.utc(item.to).local().format(),
                              })
                          )
                        : null
                }
                meetingId={meeting.data.id}
                show={showReschedule}
                close={() => setShowSchedule(false)}
            />
            <header className="bg-white flex flex-col items-center justify-center p-6 mb-8 drop-shadow-lg">
                <h1 className="uppercase text-2xl text-blue_primary_700">
                    {meeting.data.jobPost &&
                        meeting.data.jobPost.organization.name}
                </h1>

                <h3 className="font-semibold text-xl text-neutral-700 mt-4 mb-2">
                    {meeting.data.jobPost && meeting.data.jobPost.title}
                </h3>
                <p className="text-sm text-gray-500">
                    {meeting.data.jobPost && meeting.data.jobPost.area} ·{" "}
                    {meeting.data.jobPost && meeting.data.jobPost.workModality}
                </p>
            </header>

            <div className="flex justify-center max-w-screen-xl mx-auto">
                <div className="bg-white w-full max-w-4xl rounded-md shadow-lg p-6">
                    <h3 className="text-xl text-neutral-700 font-semibold mb-6">
                        {meeting.data.name}
                    </h3>
                    <div className={styles.subsection}>
                        <p className="py-3 px-4 mb-6">
                            Scheduled from{" "}
                            <strong>
                                {moment
                                    .utc(meeting.data.startTime)
                                    .local()
                                    .format("dddd MMMM Do HH:mm A")}
                            </strong>
                            <span> to </span>
                            <strong>
                                {`${moment
                                    .utc(meeting.data.endTime)
                                    .local()
                                    .format("dddd MMMM Do HH:mm A")}`}
                            </strong>
                        </p>

                        {meeting.data.meetingLink && (
                            <>
                                <h3 className="uppercase">Meeting link</h3>

                                <Link
                                    href={
                                        meeting.data.meetingLink
                                            .toLowerCase()
                                            .includes("zoom")
                                            ? meeting.data.meetingLink.replace(
                                                  "Zoom meeting: ",
                                                  ""
                                              )
                                            : meeting.data.meetingLink
                                    }
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="text-blue_primary_800 font-semibold"
                                >
                                    {meeting.data.meetingLink
                                        .toLowerCase()
                                        .includes("zoom")
                                        ? meeting.data.meetingLink.replace(
                                              "Zoom meeting: ",
                                              ""
                                          )
                                        : meeting.data.meetingLink}
                                </Link>
                            </>
                        )}

                        {meeting.data.location && (
                            <>
                                <h3 className="uppercase">Location</h3>

                                <p className="text-blue_primary_800 font-semibold">
                                    {meeting.data.location}
                                </p>
                            </>
                        )}
                    </div>

                    {meeting.data.candidate && (
                        <div className={styles.subsection}>
                            <div className="flex items-center gap-3">
                                <div className="relative w-20 h-20">
                                    <UserAvatar
                                        avatarUrl={
                                            meeting.data.candidate.avatarUrl
                                        }
                                    />
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

                        <ul className={styles.attendee_list}>
                            {meeting.data.employerMeetingRefs?.map(
                                (employer, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="relative w-20 h-20">
                                            <UserAvatar
                                                avatarUrl={
                                                    employer.employer.avatarUrl
                                                }
                                            />
                                            <MeetingStatusBadge
                                                status={employer.status}
                                            />
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
                        <div className="w-full mb-6 flex gap-4">
                            <button
                                type="button"
                                disabled={
                                    acceptMeetingMutate.isPending ||
                                    declineMeetingMutate.isPending
                                }
                                className={`border-2 border-blue-600 hover:bg-blue-800 hover:border-blue-800 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:cursor-not-allowed disabled:opacity-80 ${
                                    meeting.data &&
                                    meeting.data.status === "MEETING_ACCEPTED"
                                        ? "bg-blue-600 text-white"
                                        : "bg-white text-neutral-900"
                                }`}
                                onClick={handleAccept}
                            >
                                Accept
                                {acceptMeetingMutate.isPending && (
                                    <SpinLoading className="ml-2" />
                                )}
                            </button>

                            <button
                                type="button"
                                disabled={
                                    declineMeetingMutate.isPending ||
                                    acceptMeetingMutate.isPending
                                }
                                className={`border-2 border-red-500 focus:outline-none hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 disabled:cursor-not-allowed disabled:opacity-80 ${
                                    meeting.data &&
                                    meeting.data.status === "MEETING_DECLINED"
                                        ? "bg-red-500 text-white"
                                        : "bg-white text-neutral-900"
                                }`}
                                onClick={handleDecline}
                            >
                                Decline
                                {declineMeetingMutate.isPending && (
                                    <SpinLoading className="ml-2" />
                                )}
                            </button>

                            <button
                                type="button"
                                className={`border-2 border-yellow-400 focus:outline-none hover:bg-yellow-500 hover:border-yellow-500 hover:text-white focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900 ${
                                    meeting.data &&
                                    meeting.data.status === "MEETING_SCHEDULING"
                                        ? "bg-yellow-400 text-white"
                                        : "bg-white text-neutral-900"
                                }`}
                                onClick={() => setShowSchedule(true)}
                            >
                                Reschedule
                            </button>
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
                <div className="bg-green-500 rounded-full border border-white absolute bottom-1 right-1 shadow-lg p-[0.5px]">
                    <CheckIcon className="w-3 h-3 text-white" />
                </div>
            );
        case "MEETING_DECLINED":
            return (
                <div className="bg-red-500 rounded-full border border-white absolute bottom-1 right-1 shadow-lg p-[0.5px]">
                    <XMarkIcon className="w-3 h-3 text-white" />
                </div>
            );
        case "MEETING_SCHEDULING":
            return (
                <div className="bg-amber-500 rounded-full border border-white absolute bottom-1 right-1 shadow-lg p-[0.5px]">
                    <MinusIcon className="w-3 h-3 text-white" />
                </div>
            );
        default:
            return (
                <div className="absolute bottom-1 right-1 shadow-lg">
                    <QuestionMarkCircleIcon className="w-4 h-4 rounded-full bg-white text-blue-500" />
                </div>
            );
    }
};
