import Image from "next/image";
import React from "react";

import logo from "/public/images/logo.svg";

import Link from "next/link";

type NotificationCardProps = {
    title: string;
    company: string;
    description: string;
    sentTime: Date;
};

const NotificationCard: React.FC<NotificationCardProps> = ({
    title,
    company,
    description,
    sentTime,
}) => {
    return (
        <Link
            href={"notifications/123"}
            className="p-6 flex items-start gap-4 bg-white rounded-md drop-shadow-lg hover:bg-slate-100 cursor-pointer"
        >
            <Image alt="Company logo" src={logo} width={40} height={40} />
            <div>
                <h2 className="text-lg font-semibold mb-1">{title}</h2>
                <p className="text-sm text-gray-500 mb-4">{company}</p>
                <p className="text-neutral-700 text-sm">{description}</p>
            </div>
        </Link>
    );
};

export default NotificationCard;
