"use client";

import React from "react";

import NotificationCard from "./NotificationCard";

const NotificationList = () => {
    return (
        <ul className="space-y-4">
            {new Array(4)
                .fill({
                    title: "Xác nhận lịch ứng viên sẽ phỏng vấn",
                    company: "Linear company - Software Engineer",
                    description:
                        "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
                    sentTime: new Date(),
                })
                .map((_, index) => (
                    <li key={index}>
                        <NotificationCard {..._} />
                    </li>
                ))}
        </ul>
    );
};

export default NotificationList;
