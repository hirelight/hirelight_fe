"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { CheckIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { RadioGroup } from "@headlessui/react";
import { toast } from "react-toastify";

import meetingServices from "@/services/meeting/meeting.service";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Button, ButtonOutline, CustomInput } from "@/components";
import { useAppSelector } from "@/redux/reduxHooks";
import { handleError } from "@/helpers";
import { SpinLoading } from "@/icons";

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
        value: "MEETING_RESCHEDULE",
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

    const employerData = useMemo(() => {
        if (meeting)
            return meeting.data.employerMeetingRefs.find(
                employer => employer.employerId === authUser!!.userId
            );
        else return;
    }, [authUser, meeting]);

    const [showReschedule, setShowSchedule] = useState(false);

    const queryClient = useQueryClient();
    const acceptMeetingMutate = useMutation({
        mutationKey: ["accept-meeting", eventId],
        mutationFn: (id: string) => meetingServices.employerAcceptMeeting(id),
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
        mutationFn: (id: string) => meetingServices.employerDeclineMeeting(id),
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

    const handleAccept = () => {
        acceptMeetingMutate.mutate(eventId as string);
    };

    const handleDecline = () => {
        declineMeetingMutate.mutate(eventId as string);
    };

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
                scheduleTime={
                    employerData && employerData.scheduleTime
                        ? JSON.parse(employerData.scheduleTime).map(
                              (item: any) => ({
                                  from: moment.utc(item.from).local().format(),
                                  to: moment.utc(item.to).local().format(),
                              })
                          )
                        : null
                }
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
                        <div className={styles.subsection}></div>
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
                        <div className="w-full mb-6 flex gap-4">
                            <button
                                type="button"
                                disabled={
                                    acceptMeetingMutate.isPending ||
                                    declineMeetingMutate.isPending
                                }
                                className={`border-2 border-blue-800 hover:bg-blue-800 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:cursor-not-allowed disabled:opacity-80 ${
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
                                className={`border-2 border-red-700 focus:outline-none hover:bg-red-700 hover:text-white focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 disabled:cursor-not-allowed disabled:opacity-80 ${
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
                                className={`border-2 border-yellow-500 focus:outline-none hover:bg-yellow-500 hover:text-white focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900 ${
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
