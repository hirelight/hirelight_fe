import React from "react";
import { CalendarIcon, TagIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

import { ButtonOutline } from "@/components";
import { EllipsisVertical } from "@/icons";

const Sidebar = () => {
    return (
        <div className="w-fit max-w-md flex flex-col gap-4 p-4">
            <ButtonOutline className="mb-6">Create new event</ButtonOutline>
            <section>
                <h3 className="flex items-center font-medium text-lg mb-4">
                    <CalendarIcon className="w-6 h-6 mr-2" />
                    <span>Today events</span>
                </h3>
                <ul className="flex flex-col gap-2">
                    {new Array(4)
                        .fill({
                            candidate: "Nguyen Thanh Kien",
                            recruiter: "Nguyen Thanh Trung",
                            startTime: "8:00",
                            endTime: "9:00",
                        })
                        .map((event, index) => (
                            <li key={index} className="flex gap-2 p-2">
                                <div className="w-7 h-7 rounded-full overflow-hidden">
                                    <Image
                                        width={28}
                                        height={28}
                                        alt="Avatar"
                                        src={
                                            process.env
                                                .NEXT_PUBLIC_AVATAR_URL as string
                                        }
                                    />
                                </div>
                                <div className="flex-1 flex flex-col text-sm ">
                                    <strong>{event.candidate}</strong>
                                    <p className="max-w-full overflow-hidden text-ellipsis">
                                        {event.startTime}-{event.endTime} by{" "}
                                        {event.recruiter}
                                    </p>
                                </div>

                                <div className="w-4 h-4 rounded-full bg-green-300 ml-4"></div>
                            </li>
                        ))}
                </ul>
            </section>

            <section>
                <h3 className="flex items-center font-medium text-lg mb-4">
                    <TagIcon className="w-6 h-6 mr-2" />
                    <span>Tags</span>
                </h3>
                <ul className="flex flex-col gap-2">
                    {new Array(4)
                        .fill({
                            name: "Live video interview",
                        })
                        .map((event, index) => (
                            <li key={index} className="flex gap-2 p-2">
                                <input
                                    id={`interview-${index}`}
                                    type="checkbox"
                                    value=""
                                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor={`interview-${index}`}
                                    className="flex-1 flex items-center gap-2 text-sm "
                                >
                                    <div className="w-4 h-4 rounded-full bg-green-300"></div>
                                    <p className="max-w-full overflow-hidden text-ellipsis">
                                        {event.name}
                                    </p>
                                </label>

                                <EllipsisVertical className="w-5 h-5" />
                            </li>
                        ))}
                </ul>
            </section>
        </div>
    );
};

export default Sidebar;
