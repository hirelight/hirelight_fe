export interface IMeetingDto {
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
    status: string;
    candidate: {
        email: string;
        firstName: string;
        lastName: string;
        avatarUrl: string;
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
    };
    employerMeetingRefs: MeetingEmployer[];
}

export interface MeetingEmployer {
    employerId: string;
    meetingId: string;
    status: string;
    scheduleTime: string;
    employer: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        status: string;
    };
}

export interface ICreateMeetings {
    assessmentId: string;
    candidateId: string;
    startTime: Date;
    endTime: Date;
    name: string;
    description: string;
    meetingLink: string;
    location: string;
    employerIds: string[];
}

export interface IEditMeetingDto {
    id: string;
    candidateId: string;
    startTime: Date;
    endTime: Date;
    name: string;
    description: string;
    meetingLink: string;
    recordLink: string;
    location: string;
}
