"use client";

import { UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";

type UserAvatarProps = {
    avatarUrl?: string | null;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ avatarUrl }) => {
    if (avatarUrl)
        return (
            <Image
                src={avatarUrl}
                alt="Collaborator avatar"
                width={30}
                height={30}
                className="w-full h-full rounded-full object-cover"
                unoptimized
            />
        );
    else
        return (
            <div className="w-full h-full rounded-full text-inherit">
                <UserCircleIcon />
            </div>
        );
};

export default UserAvatar;
