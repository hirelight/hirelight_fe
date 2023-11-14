import React, { useCallback, useEffect, useState } from "react";

import { humanReadable } from "@/helpers";

import styles from "./styles.module.scss";

type TimerProps = {
    data?: number;
    title?: string;
    id?: string;
    errorText?: string;
    required?: boolean;
    onChange?: (seconds: number) => void;
};

const Timer: React.FC<TimerProps> = ({
    data,
    title,
    id,
    errorText,
    required = false,
    onChange,
}) => {
    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");

    const handleReformat = (
        content: string,
        max: number
    ): string | undefined => {
        const pattern = /^\d*\.?\d*$/;
        if (pattern.test(content)) {
            if (!content) {
                return "00";
            } else if (parseInt(content) > max) {
                return max.toString();
            } else if (content.length > 2) {
                let value = content.substring(1);
                if (parseInt(value) > max) return max.toString();
                else return value;
            } else return content;
        }
    };

    const handleChange = () => {
        const totalSeconds =
            parseInt(hours, 10) * 3600 +
            parseInt(minutes, 10) * 60 +
            parseInt(seconds, 10);

        if (onChange) onChange(totalSeconds);
    };

    useEffect(() => {
        if (data) {
            const value = humanReadable(data);
            setHours(value.hours.toString());
            setMinutes(value.minutes.toString());
            setSeconds(value.seconds.toString());
        }
    }, [data]);

    return (
        <div>
            {title && (
                <h4
                    className={
                        styles.timer__label +
                        ` ${errorText ? styles.error : ""}`
                    }
                >
                    {required && <span className="text-red-500 mr-1">*</span>}
                    {title}
                    {!required && (
                        <span className="text-neutral-500 text-sm ml-1">
                            (Optional)
                        </span>
                    )}
                </h4>
            )}
            <label className={styles.timer__wrapper}>
                <input
                    type="text"
                    value={hours}
                    onChange={e => {
                        const data = handleReformat(e.target.value, 99);
                        if (!data) return;

                        setHours(data);

                        if (onChange) {
                            const totalSeconds =
                                parseInt(data, 10) * 3600 +
                                parseInt(minutes, 10) * 60 +
                                parseInt(seconds, 10);
                            onChange(totalSeconds);
                        }
                    }}
                    placeholder="hh"
                    inputMode="numeric"
                    max={100}
                    className="text-sm placeholder:text-sm w-6 outline-none border-none ring-0 focus:ring-0 p-0"
                />
                <span>:</span>
                <input
                    type="text"
                    value={minutes}
                    onChange={e => {
                        const data = handleReformat(e.target.value, 60);
                        if (!data) return;

                        setMinutes(data);

                        if (onChange) {
                            const totalSeconds =
                                parseInt(hours, 10) * 3600 +
                                parseInt(data, 10) * 60 +
                                parseInt(seconds, 10);
                            onChange(totalSeconds);
                        }
                    }}
                    placeholder="mm"
                    inputMode="numeric"
                    className={`text-sm placeholder:text-sm w-6 pr-1 ml-1 outline-none border-none ring-0 focus:ring-0 p-0`}
                />
                <span>:</span>
                <input
                    type="text"
                    value={seconds}
                    onChange={e => {
                        const data = handleReformat(e.target.value, 60);
                        if (!data) return;

                        setSeconds(data);

                        if (onChange) {
                            const totalSeconds =
                                parseInt(hours, 10) * 3600 +
                                parseInt(minutes, 10) * 60 +
                                parseInt(data, 10);
                            onChange(totalSeconds);
                        }
                    }}
                    placeholder="ss"
                    inputMode="numeric"
                    className="text-sm placeholder:text-sm w-6 pr-1 ml-1 outline-none border-none ring-0 focus:ring-0 p-0"
                />
            </label>
            {errorText && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">{errorText} </span>
                </p>
            )}
        </div>
    );
};

export default Timer;
