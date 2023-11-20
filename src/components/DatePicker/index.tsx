"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    ArrowLongLeftIcon,
    ArrowLongRightIcon,
} from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";

import { useOutsideClick } from "@/hooks/useClickOutside";

import styles from "./styles.module.scss";

const MONTHS = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const isSameDate = (date1: Date, date2: Date) => {
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    );
};

interface DatePickerProps {
    id?: string;
    name?: string;
    value?: Date;
    onChange: (date: Date) => void;
    minDate?: Date;
    maxDate?: Date;
    pos?: "top" | "bottom";
    required?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
    value,
    onChange,
    id,
    name,
    minDate,
    maxDate,
    pos = "bottom",
    required,
}) => {
    const wrapperRef = useOutsideClick<HTMLDivElement>(() =>
        setShowDatepicker(false)
    );

    const dropdownRef = useRef<HTMLDivElement>(null);

    const [showDatepicker, setShowDatepicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [currentDate, setCurrentDate] = useState(
        selectedDate ? selectedDate : new Date()
    );
    const [showYear, setShowYear] = useState(false);
    const [showMonth, setShowMonth] = useState(false);

    const handlePrev = () => {
        if (showYear)
            setCurrentDate(
                new Date(
                    currentDate.getFullYear() - 5,
                    currentDate.getMonth(),
                    currentDate.getDate()
                )
            );
        else
            setCurrentDate(
                new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1,
                    currentDate.getDate()
                )
            );
    };

    // redraw the fullboard days of the next month
    const handleNext = () => {
        if (showYear)
            setCurrentDate(
                new Date(
                    currentDate.getFullYear() + 8,
                    currentDate.getMonth(),
                    currentDate.getDate()
                )
            );
        else
            setCurrentDate(
                new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                    currentDate.getDate()
                )
            );
    };

    const handleDateChange = (
        e: React.MouseEvent<HTMLSpanElement, MouseEvent>
    ) => {
        const targetTime = e.currentTarget.getAttribute("data-date") as string;
        const parseDate = new Date(parseInt(targetTime));
        setSelectedDate(parseDate);
        setCurrentDate(parseDate);
        setShowDatepicker(false);
        onChange(
            new Date(
                `${parseDate.getFullYear()}-${parseDate.getMonth() + 1}-${
                    parseDate.getDate() < 10
                        ? `0${parseDate.getDate()}`
                        : parseDate.getDate()
                }`
            )
        );
    };

    const handleChangeBoard = (date: Date) => {
        setCurrentDate(date);
    };

    const drawDaysInMonth = () => {
        const dayList: React.JSX.Element[] = [];
        const numOfDaysPrevMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        ).getDay();
        const lastDayOfPrevMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0
        );

        const lastDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        );

        for (let i = numOfDaysPrevMonth - 1; i >= 0; i--) {
            const pastDate = new Date(
                lastDate.getFullYear(),
                lastDate.getMonth() - 1,
                lastDayOfPrevMonth.getDate() - i
            );

            const isDisabled =
                (minDate && moment(pastDate).isBefore(minDate, "date")) ||
                (maxDate && moment(pastDate).isAfter(maxDate, "date"));
            let __outer = (
                <span
                    key={"prevMonth" + i.toString()}
                    className={`${styles.datepicker__cell} ${styles.before} ${
                        isDisabled ? styles.disabled : ""
                    }`}
                    onClick={isDisabled ? () => {} : handleDateChange}
                    data-date={pastDate.getTime()}
                >
                    {pastDate.getDate()}
                </span>
            );

            dayList.push(__outer);
        }

        for (let i = 1; i <= lastDate.getDate(); i++) {
            const curDate = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                i
            );
            const isDisabled =
                (minDate && moment(curDate).isBefore(minDate, "date")) ||
                (maxDate && moment(curDate).isAfter(maxDate, "date"));
            let __outer = (
                <span
                    key={"currentMonth" + i.toString()}
                    className={`${styles.datepicker__cell} ${
                        selectedDate && isSameDate(selectedDate, curDate)
                            ? styles.selected
                            : ""
                    } ${isDisabled ? styles.disabled : ""}`}
                    onClick={isDisabled ? () => {} : handleDateChange}
                    data-date={curDate.getTime()}
                >
                    {i}
                </span>
            );

            dayList.push(__outer);
        }

        for (let i = 1; i < 7 - lastDate.getDay(); i++) {
            const nextDate = new Date(
                lastDate.getFullYear(),
                lastDate.getMonth() + 1,
                i
            ).getTime();

            const isDisabled =
                (minDate && moment(nextDate).isBefore(minDate, "date")) ||
                (maxDate && moment(nextDate).isAfter(maxDate, "date"));

            let __outer = (
                <span
                    key={"nextMonth" + i.toString()}
                    className={`${styles.datepicker__cell} ${styles.after} ${
                        isDisabled ? styles.disabled : ""
                    }`}
                    onClick={isDisabled ? () => {} : handleDateChange}
                    data-date={nextDate}
                >
                    {i}
                </span>
            );

            dayList.push(__outer);
        }

        const __container = (
            <React.Fragment>{dayList.map(item => item)}</React.Fragment>
        );
        return __container;
    };

    useEffect(() => {
        if (value) setSelectedDate(new Date(value));
    }, [value]);

    return (
        <div ref={wrapperRef} className="relative">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </div>
                <input
                    type="text"
                    id={id}
                    name={name}
                    required={required}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onFocusCapture={() => setShowDatepicker(true)}
                    placeholder="dd/mm/yyyy"
                    value={moment(selectedDate).format("DD/MM/YY") ?? ""}
                    onChange={e => {
                        e.preventDefault();
                        console.log(
                            moment(e.currentTarget.value, "DD/MM/YY").toDate()
                        );
                        onChange(
                            moment(e.currentTarget.value, "DD/MM/YY").toDate()
                        );
                    }}
                />
            </div>
            <AnimatePresence>
                {showDatepicker && (
                    <motion.div
                        ref={dropdownRef}
                        initial={{
                            opacity: 0,
                            visibility: "hidden",
                            scale: 0.9,
                        }}
                        animate={{
                            opacity: 1,
                            visibility: "visible",
                            scale: 1,
                            transitionTimingFunction: "ease-out",
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.9,
                            transitionTimingFunction: "ease-in",
                        }}
                        className={`absolute left-0 z-50 ${
                            pos === "bottom" || !pos
                                ? "top-full pt-2"
                                : "bottom-full pb-2"
                        }`}
                    >
                        <div className="p-4 bg-white rounded-md shadow-lg">
                            <div className={styles.datepicker__header}>
                                <div className="flex justify-between mb-2">
                                    <button
                                        type="button"
                                        className="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                        onClick={handlePrev}
                                    >
                                        <ArrowLongLeftIcon className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        className="text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                                        onClick={() => {
                                            setShowMonth(false);
                                            setShowYear(true);
                                        }}
                                    >
                                        {showYear || showMonth
                                            ? `${currentDate.getFullYear()}`
                                            : `${
                                                  MONTHS[currentDate.getMonth()]
                                              } ${currentDate.getFullYear()}`}
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                        onClick={handleNext}
                                    >
                                        <ArrowLongRightIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className={styles.datepicker__main}>
                                <div className="datepicker__view">
                                    <AnimatePresence initial={false}>
                                        {!showYear && !showMonth && (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                }}
                                                className="days"
                                            >
                                                <div className="grid grid-cols-7 mb-1">
                                                    {[
                                                        "Su",
                                                        "Mo",
                                                        "Tu",
                                                        "We",
                                                        "Th",
                                                        "Fr",
                                                        "Sa",
                                                    ].map(dayOfWeek => (
                                                        <span
                                                            key={dayOfWeek}
                                                            className="text-center h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400"
                                                        >
                                                            {dayOfWeek}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="w-64 grid grid-cols-7">
                                                    {drawDaysInMonth()}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <AnimatePresence>
                                        {showYear && !showMonth ? (
                                            <motion.div
                                                key={"years"}
                                                initial={{
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    transition: {
                                                        duration: 0.3,
                                                    },
                                                }}
                                                className={`w-64 grid grid-cols-4`}
                                            >
                                                {new Array(12)
                                                    .fill("")
                                                    .map((_, index) => (
                                                        <button
                                                            key={index}
                                                            type="button"
                                                            className={`${
                                                                styles.datepicker__cell
                                                            } ${
                                                                selectedDate &&
                                                                selectedDate.getFullYear() ===
                                                                    currentDate.getFullYear() +
                                                                        index -
                                                                        4
                                                                    ? styles.selected
                                                                    : ""
                                                            }`}
                                                            onClick={() => {
                                                                handleChangeBoard(
                                                                    new Date(
                                                                        currentDate.getFullYear() +
                                                                            index -
                                                                            4,
                                                                        currentDate.getMonth(),
                                                                        currentDate.getDate()
                                                                    )
                                                                );
                                                                setShowYear(
                                                                    false
                                                                );
                                                                setShowMonth(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            {currentDate.getFullYear() +
                                                                index -
                                                                4}
                                                        </button>
                                                    ))}
                                            </motion.div>
                                        ) : showMonth ? (
                                            <motion.div
                                                key={"months"}
                                                initial={{
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                }}
                                                className={`w-64 grid grid-cols-4`}
                                            >
                                                {MONTHS.map(item =>
                                                    item.slice(0, 3)
                                                ).map((month, index) => (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        className={
                                                            styles.datepicker__cell
                                                        }
                                                        onClick={() => {
                                                            handleChangeBoard(
                                                                new Date(
                                                                    currentDate.getFullYear(),
                                                                    index + 1,
                                                                    currentDate.getDate()
                                                                )
                                                            );
                                                            setShowMonth(false);
                                                        }}
                                                    >
                                                        {month}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        ) : null}
                                    </AnimatePresence>
                                </div>
                            </div>
                            <div className={styles.datepicker__footer}></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DatePicker;
