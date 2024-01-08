"use client";

import React, { useEffect, useMemo, useState } from "react";

import { humanReadable, pad } from "@/helpers";

import { useCountdown } from "./useCountDown";
import styles from "./styles.module.scss";

type CountdownTimerProps = {
    targetDate: Date;
    stop?: boolean;
    onEnd?: () => void;
    onChange?: (time: number) => void;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({
    targetDate,
    onEnd,
    stop,
    onChange,
}) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate, onChange);
    const isOut = useMemo(
        () => hours + minutes + seconds,
        [hours, minutes, seconds]
    );

    useEffect(() => {
        if (isOut === 0 && onEnd) {
            onEnd();
        }
    }, [isOut, onEnd]);

    return (
        <ShowCounter
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
        />
    );
};

export default CountdownTimer;

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
