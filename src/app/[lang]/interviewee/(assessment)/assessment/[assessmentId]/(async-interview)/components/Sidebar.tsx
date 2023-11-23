import React from "react";

import { useAsyncVideoAssessment } from "./AsyncVideoAssessment";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
    const { answers, curPos } = useAsyncVideoAssessment();

    return (
        <div className="p-4 border-r border-gray-300">
            <div className="flex flex-col gap-4">
                {answers?.map((question, index) => (
                    <div
                        key={question.id}
                        className={`${styles.ques_btn} ${
                            curPos === index ? styles.active : ""
                        }`}
                    >
                        <span className="block p-2">{index + 1}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
