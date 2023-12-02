import {
    ChatBubbleLeftRightIcon,
    UserIcon,
    PencilSquareIcon,
    ClipboardDocumentListIcon,
    VideoCameraIcon,
    SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import { ListBulletIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

import { AssessmentTypeKey } from "@/interfaces/assessment.interface";

export const getIconBaseOnAssessmentType = (type: AssessmentTypeKey) => {
    switch (type) {
        case "THIRD_PARTY_ASSESSMENT":
            return <SquaresPlusIcon />;
        case "CV_SCREENING_ASSESSMENT":
            return <ClipboardDocumentListIcon />;
        case "ASYNC_VIDEO_INTERVIEW_ASSESSMENT":
            return <VideoCameraIcon />;
        case "LIVE_VIDEO_INTERVIEW_ASSESSMENT":
            return <ChatBubbleLeftRightIcon />;
        case "MULTIPLE_CHOICE_QUESTION_ASSESSMENT":
            return <ListBulletIcon />;
        case "HIRED_ASSESSMENT":
            return <PencilSquareIcon />;
        default:
            return <UserIcon />;
    }
};

export const getImageNode = (url?: string | null) => {
    if (url)
        return (
            <Image
                src={url}
                alt="Collaborator avatar"
                width={30}
                height={30}
                className="w-full h-full rounded-full object-cover"
                unoptimized
            />
        );
    else
        return (
            <div className="w-full h-full rounded-full text-neutral-600">
                <UserCircleIcon />
            </div>
        );
};
