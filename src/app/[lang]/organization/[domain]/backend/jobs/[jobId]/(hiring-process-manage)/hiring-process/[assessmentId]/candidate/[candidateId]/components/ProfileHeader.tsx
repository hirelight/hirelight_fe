"use client";

import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useRef } from "react";

import { useAppSelector } from "@/redux/reduxHooks";
import { AppFormDefaultSection, IAppFormSection } from "@/interfaces";

const ProfileHeader = () => {
    const applicantProfile = useAppSelector(
        state => state.applicantProfile.data
    );

    const personalDetail = useRef<IAppFormSection>(
        applicantProfile.content.find(
            item => item.id === AppFormDefaultSection.PERSONAL_INFORMATION
        )!!
    );
    return (
        <div className="bg-white rounded-md border border-gray-300 mb-4 overflow-hidden">
            <div className="h-24 bg-slate-100"></div>
            <div className="p-4 xl:px-6 flex gap-4">
                <div>
                    <div className="w-20 aspect-square rounded-full overflow-hidden">
                        <Image
                            alt="Candidate avatar"
                            src={process.env.NEXT_PUBLIC_AVATAR_URL as string}
                            width={0}
                            height={0}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1 flex-col text-sm text-neutral-500">
                        <h3 className="text-2xl font-semibold text-neutral-700">
                            {`${applicantProfile.firstName} ${applicantProfile.lastName}`}
                        </h3>
                        <div>
                            <span>
                                {" "}
                                {personalDetail.current.fields.find(
                                    item => item.id === "headline"
                                )!!.value ?? ""}
                            </span>
                        </div>
                        <div>
                            <span>
                                Fpt Soft (2022 - now) • Hcm Uni (2020 - 2023)
                            </span>
                        </div>
                        <div className="my-4 flex gap-4">
                            <span className="flex items-center gap-1">
                                <MapPinIcon className="w-4 h-4" />
                                <span>
                                    {personalDetail.current.fields.find(
                                        item => item.id === "address"
                                    )!!.value ?? ""}
                                </span>
                            </span>
                            <span className="flex items-center gap-1">
                                <PhoneIcon className="w-4 h-4" />
                                <span>
                                    {" "}
                                    {personalDetail.current.fields.find(
                                        item => item.id === "phone"
                                    )!!.value ?? ""}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
