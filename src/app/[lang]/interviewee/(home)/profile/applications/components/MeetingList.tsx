"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

import { useAppSelector } from "@/redux/reduxHooks";
import meetingServices from "@/services/meeting/meeting.service";

const MeetingList = () => {
    const { authUser } = useAppSelector(state => state.auth);
    const { data: meetings } = useQuery({
        queryKey: ["my-meetings"],
        queryFn: () =>
            meetingServices.getListByAssessmentId(undefined, authUser!!.userId),
    });

    console.log(meetings);
    return <div>MeetingList</div>;
};

export default MeetingList;
