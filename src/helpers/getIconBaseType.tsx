import {
    ChatBubbleLeftRightIcon,
    UserIcon,
    PencilSquareIcon,
    ClipboardDocumentListIcon,
    VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { ListBulletIcon } from "@heroicons/react/24/solid";

import { AssessmentTypeKey } from "@/interfaces/assessment.interface";

export const getIconBaseOnAssessmentType = (type: AssessmentTypeKey) => {
    switch (type) {
        case "THIRD_PARTY_ASSESSMENT":
            return <UserIcon />;
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
