import { IAssessmentDto, IJobDto, IOrganizationDto } from "..";

export interface IMeetingDto {
    id: string;
    creatorId: string;
    assessmentId: string;
    candidateId: string;
    startTime: Date;
    endTime: Date;
    scheduleTime: string;
    name: string;
    description: string;
    meetingLink: string;
    recordLinks: string;
    location: string;
    createdTime: Date;
    updatedTime: Date;
    status: MeetingStatus;
    candidate: {
        email: string;
        firstName: string;
        lastName: string;
        avatarUrl: string | null;
        timeZone: 0;
        certificates: string;
        educations: string;
        experiences: string;
        createdTime: Date;
        updatedTime: Date;
    };
    creator: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        status: string;
        avatarUrl: string | null;
    } | null;
    employerMeetingRefs: MeetingEmployer[];
    jobPost?: IJobDto & {
        organization: IOrganizationDto;
    };
    assessment?: IAssessmentDto;
}

export interface MeetingEmployer {
    employerId: string;
    meetingId: string;
    status: MeetingStatus;
    scheduleTime: string;
    employer: {
        id: string;
        email: string;
        firstName: string;
        lastName: string | null;
        status: string;
        avatarUrl: string | null;
    };
}

export interface ICreateMeetings {
    assessmentId: string;
    candidateId: string | null;
    startTime: Date | string;
    endTime: Date | string;
    name: string;
    description: string;
    meetingLink: string;
    location: string;
    employerIds: string[];
    isZoomCreated?: boolean;
}

export interface IEditMeetingDto {
    id: string;
    assessmentId: string;
    candidateId: string | null;
    startTime: Date | string;
    endTime: Date | string;
    name: string;
    description: string;
    meetingLink: string;
    recordLink: string;
    location: string;
}

export interface IUpdateAttendee {
    meetingId: string;
    employers: string[];
}

export enum MeetingStatusEnum {
    MEETING_ACCEPTED = "MEETING_ACCEPTED",
    MEETING_DECLINED = "MEETING_DECLINED",
    MEETING_SCHEDULING = "MEETING_SCHEDULING",
    IDLE = "IDLE",
}

export type MeetingStatus = keyof typeof MeetingStatusEnum;
