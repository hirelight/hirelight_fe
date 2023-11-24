"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { humanReadable, pad } from "@/helpers";

import { useCountdown } from "./useCountDown";
import styles from "./styles.module.scss";

type ProgressTimerProps = {
    title?: string;
    targetDate: Date;
    stop?: boolean;
    onEnd?: () => void;
    onChange?: (time: number) => void;
};

const ProgressTimer: React.FC<ProgressTimerProps> = ({
    title,
    targetDate,
    onEnd,
    stop,
    onChange,
}) => {
    const totalDuration = useRef<number>(
        (targetDate.getTime() - new Date().getTime()) / 1000
    );
    const [days, hours, minutes, seconds] = useCountdown(targetDate, onChange);
    const isOut = useMemo(
        () => hours * 3600 + minutes * 60 + seconds,
        [hours, minutes, seconds]
    );
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isOut <= 0 && onEnd) {
            onEnd();
        }

        const elapsedTime = totalDuration.current - isOut;
        const calculatedProgress = (elapsedTime / totalDuration.current) * 100;
        setProgress(calculatedProgress);
    }, [isOut, onEnd, targetDate]);

    return (
        <div>
            <div className="flex justify-between items-center">
                <strong>{title ?? ""}</strong>
                <ShowCounter
                    days={days}
                    hours={hours}
                    minutes={minutes}
                    seconds={seconds}
                />
            </div>
            <div className="min-w-[120px] h-1.5 border border-gray-300 rounded-full relative overflow-hidden">
                <div
                    className="absolute left-0 top-0 h-5 bg-blue_primary_700 w-0 transition-all ease-out"
                    style={{
                        width: `${100 - progress}%`,
                    }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressTimer;

const ShowCounter = ({
    days,
    hours,
    minutes,
    seconds,
}: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}) => {
    return (
        <div className={styles.show_counter}>
            <div className={styles.countdown_link}>
                <DateTimeDisplay
                    value={hours <= 0 ? 0 : hours}
                    type={"Hours"}
                    isDanger={false}
                />
                <p>:</p>
                <DateTimeDisplay
                    value={minutes <= 0 ? 0 : minutes}
                    type={"Mins"}
                    isDanger={false}
                />
                <p>:</p>
                <DateTimeDisplay
                    value={seconds <= 0 ? 0 : seconds}
                    type={"Seconds"}
                    isDanger={false}
                />
            </div>
        </div>
    );
};

const DateTimeDisplay = ({
    value,
    type,
    isDanger,
}: {
    value: number | string;
    type: any;
    isDanger: boolean;
}) => {
    return (
        <div className={`${styles.countdown} ${isDanger ? styles.danger : ""}`}>
            <p>{pad(value as number)}</p>
        </div>
    );
};

const ExpiredNotice = () => {
    return (
        <div className={styles.expired_notice}>
            <span>Expired!!!</span>
            <p>Please select a future date and time.</p>
        </div>
    );
};
