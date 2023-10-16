"use client";

import React from "react";

import styles from "./page.module.scss";
import WaitingResponseSection from "./components/WaitingResponseSection";
import InInterviewProgressSection from "./components/InInterviewProgressSection";
import EndSection from "./components/EndSection";

enum EStage {
    WAITING,
    IN_PROGRESS,
    END,
}

const MyApplications = () => {
    const [stage, setStage] = React.useState<EStage>(EStage.WAITING);

    const getStage = () => {
        switch (stage) {
            case EStage.WAITING:
                return <WaitingResponseSection />;
            case EStage.IN_PROGRESS:
                return <InInterviewProgressSection />;
            default:
                return <EndSection />;
        }
    };

    return (
        <div className="w-full">
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm flex justify-center items-center pt-4 pb-6 mb-10">
                <div className="flex items-center gap-16">
                    <button
                        type="button"
                        className={`relative font-medium text-lg transition-all after:content-[""] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-0 after:bg-blue_primary_800 after:mt-2 after:rounded-full after:transition-all ${
                            stage === EStage.WAITING ? styles.active : ""
                        }`}
                        onClick={() => setStage(EStage.WAITING)}
                    >
                        Wait for response
                    </button>
                    <button
                        type="button"
                        className={`relative font-medium text-lg transition-all after:content-[""] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-0 after:bg-blue_primary_800 after:mt-2 after:rounded-full after:transition-all ${
                            stage === EStage.IN_PROGRESS ? styles.active : ""
                        }`}
                        onClick={() => setStage(EStage.IN_PROGRESS)}
                    >
                        In interview progress
                    </button>
                    <button
                        type="button"
                        className={`relative font-medium text-lg transition-all after:content-[""] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-0 after:bg-blue_primary_800 after:mt-2 after:rounded-full after:transition-all ${
                            stage === EStage.END ? styles.active : ""
                        }`}
                        onClick={() => setStage(EStage.END)}
                    >
                        Finished
                    </button>
                </div>
            </div>
            <div>{getStage()}</div>
        </div>
    );
};

export default MyApplications;
