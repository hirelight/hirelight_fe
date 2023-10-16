import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";

const ProfileHeader = () => {
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
                            Nguyen Kien(Full name)
                        </h3>
                        <div>
                            <span>Headlines</span>
                        </div>
                        <div>
                            <span>
                                Fpt Soft (2022 - now) • Hcm Uni (2020 - 2023)
                            </span>
                        </div>
                        <div className="my-4 flex gap-4">
                            <span className="flex items-center gap-1">
                                <MapPinIcon className="w-4 h-4" />
                                <span>Vietnam (Location)</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <PhoneIcon className="w-4 h-4" />
                                <span>+84123456789</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
