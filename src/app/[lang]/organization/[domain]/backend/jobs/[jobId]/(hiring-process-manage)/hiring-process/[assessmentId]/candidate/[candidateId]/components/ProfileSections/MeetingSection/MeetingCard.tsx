import React, { useRef, useState } from "react";
import Image from "next/image";
import {
    ArrowTopRightOnSquareIcon,
    CheckIcon,
    PaperAirplaneIcon,
    QuestionMarkCircleIcon,
    TrashIcon,
    UserCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import moment from "moment";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { Tooltip } from "flowbite-react";
import { useQueryClient } from "@tanstack/react-query";

import {
    ApplicationFormJSON,
    IMeetingDto,
    MeetingEmployer,
    MeetingStatus,
} from "@/services";
import { AppFormDefaultSection, IAppFormField } from "@/interfaces";
import { useAppSelector } from "@/redux/reduxHooks";
import meetingServices from "@/services/meeting/meeting.service";
import { handleError } from "@/helpers";

import styles from "./MeetingCard.module.scss";
import EditMeeting from "./EditMeeting";

type MeetingCardProps = {
    data: IMeetingDto;
};

const MeetingCard: React.FC<MeetingCardProps> = ({ data }) => {
    const { lang, assessmentId, candidateId } = useParams();

    const queryClient = useQueryClient();

    const { data: applicantAssessmentDetail } = useAppSelector(
        state => state.applicantAssessmentDetail
    );
    const avaterDetail = useRef<IAppFormField | undefined>(
        (
            JSON.parse(
                applicantAssessmentDetail!!.applicantProfile.content
            ) as ApplicationFormJSON
        ).form_structure
            .find(
                item => item.id === AppFormDefaultSection.PERSONAL_INFORMATION
            )!!
            .fields.find(field => field.id === "avatar")
    );
    const [showEdit, setShowEdit] = useState(false);

    const handleInviteCandidate = async () => {
        if (!applicantAssessmentDetail!!.applicantProfile.candidateId)
            toast.error("Please select a candidate");
        try {
            const res = await meetingServices.editMeeting({
                id: data.id,
                assessmentId: data.assessmentId,
                candidateId:
                    applicantAssessmentDetail!!.applicantProfile.candidateId,
                startTime: data.startTime,
                endTime: data.endTime,
                name: data.name,
                description: data.description,
                meetingLink: data.meetingLink,
                recordLink: data.recordLinks,
                location: data.location,
            });

            toast.success(res.message);
            queryClient.invalidateQueries({
                queryKey: ["meeting-list", assessmentId, candidateId],
            });
        } catch (error) {
            handleError(error);
        }
    };

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

    return (
        <>
            <EditMeeting
                data={data}
                show={showEdit}
                onClose={() => setShowEdit(false)}
            />
            <div className="flex items-center gap-2">
                <div className="w-8 h-8">{getImageNode()}</div>
                <div className="flex-1">
                    <p>
                        <strong>
                            {data.creator.firstName +
                                " " +
                                (data.creator.lastName ?? "")}
                        </strong>{" "}
                        schedule a{" "}
                        <Link
                            target="_blank"
                            href={`/${lang}/events/${data.id}`}
                            className="inline-flex items-center gap-1 text-blue_primary_800 group"
                        >
                            <strong className="group-hover:underline">
                                meeting
                            </strong>
                            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                        </Link>
                    </p>

                    <span>{moment.utc(data.createdTime).fromNow()}</span>
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
                    className="p-1 rounded hover:bg-slate-200/80 text-neutral-700"
                >
                    <TrashIcon className="w-5 h-5" />
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
                        .format("dddd, MMMM Do, YYYY HH:mm A")}
                </div>

                {/* ************************************Meeting slot section**************************************** */}
                <div>To</div>
                <div>
                    {moment
                        .utc(data.endTime)
                        .local()
                        .format("dddd, MMMM Do, YYYY HH:mm A")}
                </div>

                {/* ************************************Attendees Section**************************************** */}
                <div>Attendees</div>
                <div className="flex gap-4 flex-wrap">
                    {data.candidate && (
                        <div className="flex items-center gap-2 basis-56">
                            <div className="relative w-8 h-8">
                                {getImageNode(
                                    avaterDetail.current
                                        ? avaterDetail.current.value
                                            ? avaterDetail.current.value.value
                                            : undefined
                                        : undefined
                                )}

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
                <div>Meeting link</div>
                <div>
                    <Link
                        href={data.meetingLink}
                        target="_blank"
                        className="text-blue_primary_800 font-semibold"
                    >
                        Link
                    </Link>
                </div>

                {/* ************************************Meeting title section**************************************** */}
                <div>Title</div>
                <div className="ql-editor !p-0">{data.name}</div>

                {/* ************************************Meeting description section**************************************** */}
                <div>Description</div>
                <div className="ql-editor !p-0">{data.description}</div>

                <div>Organizer</div>
                <div className="ql-editor !p-0">
                    {data.creator.firstName +
                        " " +
                        (data.creator.lastName ?? "")}
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
    return (
        <div className="flex items-center gap-2 basis-56">
            <div className="w-8 h-8 relative">
                <div className="w-full h-full rounded-full text-neutral-600">
                    <UserCircleIcon />
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
                <div className="bg-white rounded-full border border-white absolute bottom-0 right-0 shadow-lg p-[0.5px]">
                    <QuestionMarkCircleIcon className="w-3 h-3 text-blue-500" />
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
