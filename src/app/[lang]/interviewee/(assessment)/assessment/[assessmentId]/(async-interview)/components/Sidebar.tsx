import React from "react";

import { useAsyncVideoAssessment } from "./AsyncVideoAssessment";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
    const { assessmentData, setCurPos, curPos } = useAsyncVideoAssessment();

    return (
        <div className="p-4 border-r border-gray-300">
            <div className="flex flex-col gap-4">
                {assessmentData?.questionAnswerSet?.map((question, index) => (
                    <button
                        key={question.id}
                        type="button"
                        className={`${styles.ques_btn} ${
                            curPos === index ? styles.active : ""
                        }`}
                        onClick={() => setCurPos(index)}
                    >
                        <span className="block p-2">{index + 1}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
