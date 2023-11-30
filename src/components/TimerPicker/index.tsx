"use client";

import { Listbox, Menu, Transition } from "@headlessui/react";
import {
    CheckIcon,
    ChevronDownIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "next/navigation";

import { hhmmss } from "@/helpers";

type TimerPickerProps = {
    value?: moment.Moment;
    onChange?: (value: moment.Moment) => void;
    minTime?: moment.Moment;
    maxTime?: moment.Moment;
};

const TimerPicker: React.FC<TimerPickerProps> = ({
    value,
    onChange,
    minTime,
    maxTime,
}) => {
    const { lang } = useParams();

    const [time, setTime] = useState<moment.Moment>(
        value
            ? value.minutes(Math.ceil(value.minutes() / 15) * 15)
            : moment().minutes(Math.ceil(moment().minutes() / 15) * 15)
    );

    return (
        <Listbox
            value={time}
            onChange={data => {
                setTime(data);
                if (onChange) onChange(data);
            }}
        >
            <div className="relative">
                <Listbox.Button className="relative w-full cursor-default rounded-lg border border-gray-300 bg-white py-2.5 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">
                        {moment(time).locale(lang).format("HH:mm A")}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </span>
                </Listbox.Button>
                <Transition
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute z-40 mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {new Array(24 * 4).fill("").map((_, index) => {
                            let isDisable = false;
                            let under = false;
                            let over = false;
                            if (minTime) {
                                under = moment()
                                    .startOf("day")
                                    .minutes(index * 15)
                                    .isBefore(minTime);
                            }

                            if (maxTime) {
                                over = moment()
                                    .startOf("day")
                                    .minutes(index * 15)
                                    .isAfter(maxTime);
                            }
                            isDisable = under || over;

                            return (
                                <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                        `relative select-none py-2 px-4 ${
                                            active
                                                ? "bg-amber-100 text-amber-900"
                                                : "text-gray-900"
                                        } ${
                                            isDisable
                                                ? "cursor-not-allowed opacity-50"
                                                : "cursor-pointer"
                                        }`
                                    }
                                    disabled={isDisable}
                                    value={moment()
                                        .startOf("day")
                                        .minutes(index * 15)}
                                >
                                    {({ selected }) => (
                                        <span
                                            className={`block truncate ${
                                                selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                            }`}
                                        >
                                            {moment()
                                                .startOf("day")
                                                .seconds(index * 15 * 60)
                                                .locale(lang)
                                                .format("HH:mm")}
                                        </span>
                                    )}
                                </Listbox.Option>
                            );
                        })}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
};

export default TimerPicker;
