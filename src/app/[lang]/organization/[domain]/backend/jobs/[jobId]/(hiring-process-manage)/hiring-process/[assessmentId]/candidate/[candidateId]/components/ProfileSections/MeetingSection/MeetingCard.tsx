import React, { useRef } from "react";
import Image from "next/image";
import { TrashIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import Link from "next/link";

import { ApplicationFormJSON, IMeetingDto, MeetingEmployer } from "@/services";
import { AppFormDefaultSection, IAppFormField } from "@/interfaces";
import { useAppSelector } from "@/redux/reduxHooks";

import styles from "./MeetingCard.module.scss";

type MeetingCardProps = {
    data: IMeetingDto;
};

const MeetingCard: React.FC<MeetingCardProps> = ({ data }) => {
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

    const getImageNode = (url?: string) => {
        if (url)
            return (
                <Image
                    src={url}
                    alt="Collaborator avatar"
                    width={30}
                    height={30}
                    className="w-8 h-8 rounded-full object-cover"
                />
            );
        else
            return (
                <div className="w-8 h-8 rounded-full text-neutral-600">
                    <UserCircleIcon />
                </div>
            );
    };

    return (
        <>
            <div className="flex items-center gap-2">
                {getImageNode()}
                <div className="flex-1">
                    <p>
                        <strong>
                            {data.creator.firstName +
                                " " +
                                (data.creator.lastName ?? "")}
                        </strong>{" "}
                        schedule a meeting
                    </p>

                    <span>{moment.utc(data.createdTime).fromNow()}</span>
                </div>

                <button
                    type="button"
                    className="p-1 rounded hover:bg-slate-200/80 text-neutral-700"
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>

            <div className={styles.content__wrapper}>
                {/* ************************************Meeting date section**************************************** */}
                <div>Date</div>
                <div>
                    {moment.utc(data.startTime).format("dddd, MMMM Do, YYYY")}
                </div>

                {/* ************************************Meeting slot section**************************************** */}
                <div>Time</div>
                <div>
                    {`${moment(moment.utc(data.startTime).toDate()).format(
                        "HH:mm A"
                    )} - ${moment(moment.utc(data.endTime).toDate()).format(
                        "HH:mm A"
                    )}`}
                </div>

                {/* ************************************Attendees Section**************************************** */}
                <div>Attendees</div>
                <div className="flex gap-4 flex-wrap">
                    <div className="flex items-center gap-2 basis-56">
                        {getImageNode(avaterDetail.current?.value.value)}
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
            <div className="w-8 h-8 rounded-full text-neutral-600">
                <UserCircleIcon />
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
