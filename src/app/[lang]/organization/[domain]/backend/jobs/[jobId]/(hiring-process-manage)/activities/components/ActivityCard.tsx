"use client";
import Link from "next/link";
import React from "react";

import { UserAvatar } from "@/components";
import { IActivityLogDto } from "@/services";

const ActivityCard = ({ data }: { data: IActivityLogDto }) => {
    return (
        <div className="flex text-sm">
            <div className="w-2/3">
                <p>{data.title}</p>
            </div>
            <div className="w-1/3 pl-2 flex items-center">
                <div className="w-8 h-8 mt-0.5 mr-2">
                    <UserAvatar avatarUrl={data.collaboratorDto.avatarUrl} />
                </div>
                <div>
                    <p>
                        {`${data.collaboratorDto.firstName ?? ""}  ${
                            data.collaboratorDto.lastName ?? ""
                        }`}
                    </p>
                    <p>{data.collaboratorDto.email}</p>
                </div>
            </div>
        </div>
    );
};

export default ActivityCard;
