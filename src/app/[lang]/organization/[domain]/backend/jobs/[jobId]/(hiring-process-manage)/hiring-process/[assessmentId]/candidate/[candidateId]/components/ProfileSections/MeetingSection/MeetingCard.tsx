import React, { useRef, useState } from "react";
import Image from "next/image";
import {
    ArrowTopRightOnSquareIcon,
    CheckIcon,
    LinkIcon,
    MinusIcon,
    PaperAirplaneIcon,
    QuestionMarkCircleIcon,
    TrashIcon,
    UserCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import moment from "moment";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    InformationCircleIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { Tooltip } from "flowbite-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    ApplicationFormJSON,
    IMeetingDto,
    MeetingEmployer,
    MeetingStatus,
} from "@/services";
import { AppFormDefaultSection, IAppFormField } from "@/interfaces";
import { useAppSelector } from "@/redux/reduxHooks";
import meetingServices from "@/services/meeting/meeting.service";
import { DeleteModal, Portal, UserAvatar } from "@/components";

import styles from "./MeetingCard.module.scss";
import EditMeeting from "./EditMeeting";
import ScheduleTimeModal from "./ScheduleTimeModal";

type MeetingCardProps = {
    data: IMeetingDto;
};

const MeetingCard: React.FC<MeetingCardProps> = ({ data }) => {
    const { lang, assessmentId, candidateId } = useParams();

    const queryClient = useQueryClient();

    const { data: applicantAssessmentDetail } = useAppSelector(
        state => state.applicantAssessmentDetail
    );

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showCandidateTime, setShowCandidateTime] = useState(false);

    const deleteMeetingMutate = useMutation({
        mutationKey: ["delete-meeting"],
        mutationFn: (id: string) => meetingServices.deleteMeeting(id),
        onSuccess: async res => {
            await queryClient.invalidateQueries({
                queryKey: ["meeting-list", assessmentId, candidateId],
            });
            toast.success(res.message);
        },
        onError: err => {
            // handleError(err);
        },
    });

    const handleInviteCandidate = async () => {
        if (
            (applicantAssessmentDetail &&
                !applicantAssessmentDetail.applicantProfile.candidateId) ||
            !applicantAssessmentDetail
        )
            return toast.error("Please select a candidate");
        try {
            const res = await toast.promise(
                meetingServices.editMeeting({
                    id: data.id,
                    assessmentId: data.assessmentId,
                    candidateId:
                        applicantAssessmentDetail.applicantProfile.candidateId,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    name: data.name,
                    description: data.description,
                    meetingLink: data.meetingLink,
                    recordLink: data.recordLinks,
                    location: data.location,
                }),
                {
                    pending: "Sending meeting to candidate",
                    success: "Meeting sent!",
                }
            );

            await queryClient.invalidateQueries({
                queryKey: ["meeting-list", assessmentId, candidateId],
            });
        } catch (error) {
            // handleError(error);
            await queryClient.invalidateQueries({
                queryKey: ["meeting-list", assessmentId, candidateId],
            });
        }
    };

    const handleDeleteMeeting = async () => {
        await deleteMeetingMutate.mutateAsync(data.id);
    };

    return (
        <>
            <EditMeeting
                data={data}
                show={showEdit}
                onClose={() => setShowEdit(false)}
            />
            <Portal>
                <DeleteModal
                    title="Delete meeting"
                    show={showDelete}
                    description="Are you sure you want to delete
                    this meeting? This action
                    cannot be undone."
                    onClose={() => setShowDelete(false)}
                    loading={deleteMeetingMutate.isPending}
                    onConfirm={handleDeleteMeeting}
                />
            </Portal>
            <div className="max-w-full">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8">
                        <UserAvatar avatarUrl={data.creator?.avatarUrl} />
                    </div>
                    <div className="flex-1">
                        <p>
                            <strong>
                                {data.creator
                                    ? data.creator.firstName +
                                      " " +
                                      (data.creator.lastName ?? "")
                                    : "Recruiter"}
                            </strong>{" "}
                            schedule a{" "}
                            <Link
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`/${lang}/events/${data.id}`}
                                className="inline-flex items-center gap-1 text-blue_primary_800 group mr-3"
                            >
                                <strong className="group-hover:underline">
                                    meeting
                                </strong>
                                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                            </Link>
                        </p>

                        <span>
                            {moment
                                .utc(data.createdTime)
                                .locale(lang)
                                .fromNow()}
                        </span>
                    </div>

                    {!data.candidate && (
                        <Tooltip content="Invite candidate">
                            <button
                                type="button"
                                className="p-1 rounded hover:bg-slate-200/80 text-neutral-700"
                                onClick={handleInviteCandidate}
                            >
                                <PaperAirplaneIcon className="w-5 h-5" />
                            </button>
                        </Tooltip>
                    )}

                    <button
                        type="button"
                        className="p-1 rounded hover:bg-slate-200/80 text-neutral-700 transition-all"
                        onClick={() => setShowDelete(true)}
                    >
                        <TrashIcon className="w-5 h-5 text-red-500 group-hover:text-red-700" />
                    </button>

                    <button
                        type="button"
                        className="p-1 rounded hover:bg-slate-200/80 text-neutral-700"
                        onClick={() => setShowEdit(true)}
                    >
                        <PencilSquareIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className={styles.content__wrapper}>
                    {/* ************************************Meeting date section**************************************** */}
                    <div>From</div>
                    <div>
                        {moment
                            .utc(data.startTime)
                            .local()
                            .locale(lang)
                            .format("LLLL")}
                    </div>

                    {/* ************************************Meeting slot section**************************************** */}
                    <div>To</div>
                    <div>
                        {moment
                            .utc(data.endTime)
                            .local()
                            .locale(lang)
                            .format("LLLL")}
                    </div>

                    {/* ************************************Attendees Section**************************************** */}
                    <div>Attendees</div>
                    <div className="flex gap-4 flex-wrap">
                        {data.candidate && (
                            <div className="flex items-center gap-2 basis-56">
                                <div className="relative w-8 h-8">
                                    <UserAvatar
                                        avatarUrl={data.candidate.avatarUrl}
                                    />

                                    <MeetingStatusBadge status={data.status} />
                                </div>
                                <div className="flex-1">
                                    <p className="whitespace-nowrap">
                                        <span>
                                            {data.candidate.firstName +
                                                " " +
                                                (data.candidate.lastName ?? "")}
                                        </span>
                                    </p>

                                    <span>Candidate</span>
                                </div>

                                {data.scheduleTime &&
                                    data.status === "MEETING_SCHEDULING" && (
                                        <>
                                            <button
                                                type="button"
                                                className="w-5 h-5 self-start"
                                                onClick={() =>
                                                    setShowCandidateTime(true)
                                                }
                                            >
                                                <InformationCircleIcon />
                                            </button>
                                            <ScheduleTimeModal
                                                show={showCandidateTime}
                                                close={() =>
                                                    setShowCandidateTime(false)
                                                }
                                                scheduleTime={JSON.parse(
                                                    data.scheduleTime
                                                )}
                                            />
                                        </>
                                    )}
                            </div>
                        )}
                        {data.employerMeetingRefs?.map((employer, refIdex) => (
                            <EmployerAttendeeCard
                                key={refIdex}
                                data={employer}
                                creatorId={data.creatorId}
                            />
                        ))}
                    </div>

                    {/* ************************************Meeting link section**************************************** */}
                    {data.meetingLink && (
                        <>
                            <div>Meeting link</div>
                            <div>
                                <Link
                                    href={
                                        data.meetingLink
                                            .toLowerCase()
                                            .includes("zoom")
                                            ? data.meetingLink.replace(
                                                  "Zoom meeting: ",
                                                  ""
                                              )
                                            : data.meetingLink
                                    }
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="text-blue_primary_700 font-semibold hover:underline hover:text-blue_primary_800"
                                >
                                    Link
                                    <LinkIcon className="inline-block ml-1 h-5 w-5" />
                                </Link>
                            </div>
                        </>
                    )}

                    {/* ************************************Location section**************************************** */}
                    {data.location && (
                        <>
                            <div>Location</div>
                            <div>{data.location}</div>
                        </>
                    )}

                    {/* ************************************Meeting title section**************************************** */}
                    <div>Title</div>
                    <div className="ql-editor !p-0">{data.name}</div>

                    {/* ************************************Meeting description section**************************************** */}
                    <div>Description</div>
                    <div className="ql-editor !p-0">{data.description}</div>

                    <div>Organizer</div>
                    <div className="ql-editor !p-0">
                        {data.creator
                            ? data.creator.firstName +
                              " " +
                              (data.creator.lastName ?? "")
                            : "Recruiter"}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MeetingCard;

const EmployerAttendeeCard = ({
    data,
    creatorId,
}: {
    creatorId: string;
    data: MeetingEmployer;
}) => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <div className="flex items-center gap-2 basis-56">
            <div className="w-8 h-8 relative">
                <div className="w-full h-full rounded-full text-neutral-600 overflow-hidden">
                    {data.employer.avatarUrl ? (
                        <Image
                            src={data.employer.avatarUrl}
                            alt="Collaborator avatar"
                            width={300}
                            height={300}
                            className="w-full h-full object-cover"
                            unoptimized
                        />
                    ) : (
                        <UserCircleIcon />
                    )}
                </div>

                <MeetingStatusBadge status={data.status} />
            </div>
            <div className="flex-1">
                <p className="whitespace-nowrap">
                    <span>
                        {data.employer.firstName +
                            " " +
                            (data.employer.lastName ?? "")}
                    </span>
                </p>

                {creatorId === data.employerId && <span>Organizer</span>}
            </div>

            {data.scheduleTime && data.status === "MEETING_SCHEDULING" && (
                <>
                    <button
                        type="button"
                        className="w-5 h-5 self-start"
                        onClick={() => setShowInfo(true)}
                    >
                        <InformationCircleIcon />
                    </button>
                    <ScheduleTimeModal
                        show={showInfo}
                        close={() => setShowInfo(false)}
                        scheduleTime={JSON.parse(data.scheduleTime)}
                    />
                </>
            )}
        </div>
    );
};

const MeetingStatusBadge = ({ status }: { status: MeetingStatus }) => {
    switch (status) {
        case "MEETING_ACCEPTED":
            return (
                <div className="bg-green-500 rounded-full border border-white absolute bottom-0 right-0 shadow-lg p-[0.5px]">
                    <CheckIcon className="w-3 h-3 text-white" />
                </div>
            );
        case "MEETING_DECLINED":
            return (
                <div className="bg-red-500 rounded-full border border-white absolute bottom-0 right-0 shadow-lg p-[0.5px]">
                    <XMarkIcon className="w-3 h-3 text-white" />
                </div>
            );
        case "MEETING_SCHEDULING":
            return (
                <div className="bg-amber-500 rounded-full border border-white absolute bottom-0 right-0 shadow-lg p-[0.5px]">
                    <MinusIcon className="w-3 h-3 text-white" />
                </div>
            );
        default:
            return (
                <div className="absolute bottom-0 right-0 shadow-lg">
                    <QuestionMarkCircleIcon className="w-4 h-4 rounded-full bg-white text-blue-500" />
                </div>
            );
    }
};
