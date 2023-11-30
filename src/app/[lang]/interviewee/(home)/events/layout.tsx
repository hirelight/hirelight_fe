import dynamic from "next/dynamic";
import React from "react";

import { DoubleRingLoading } from "@/components";

const IntervieweeAuthWrapper = dynamic(
    () => import("../../components/IntervieweeAuthWrapper"),
    {
        ssr: false,
        loading: () => (
            <div className="flex-1 flex justify-center items-center">
                <DoubleRingLoading className="w-32 h-32" />
            </div>
        ),
    }
);
const EventLayout = ({ children }: { children: React.ReactNode }) => {
    return <IntervieweeAuthWrapper>{children}</IntervieweeAuthWrapper>;
};

export default EventLayout;
