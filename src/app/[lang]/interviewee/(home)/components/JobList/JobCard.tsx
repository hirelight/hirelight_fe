import Image from "next/image";
import React from "react";
import moment from "moment";

import { Calendar, Clock, DollarCurrency, MapPin } from "@/icons";

import logo from "/public/images/logo.png";

import { IJobDto, JobContentJson } from "@/services";
import { IAppFormSection } from "@/interfaces";

interface JobCardProps {
    data: Omit<IJobDto, "content" | "applicationForm"> & {
        content: JobContentJson;
        applicationForm: IAppFormSection[];
    };
}

const JobCard: React.FC<JobCardProps> = ({ data }) => {
    return (
        <div className="flex gap-4 p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 hover:cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ">
            <div className="hidden md:block rounded-full w-20 h-20 border border-slate-200 overflow-hidden">
                <Image
                    alt="Company Logo"
                    src={logo}
                    width={80}
                    height={80}
                    className="w-full h-auto object-contain"
                />
            </div>

            <div className="flex-1">
                <h4 className="text-neutral-700 font-medium text-sm sm:text-base">
                    Hirelight Company
                </h4>
                <h3 className="text-neutral-700 text-lg sm:text-2xl font-semibold mt-1 mb-2">
                    {data.title}
                </h3>

                <div className="flex flex-col md:flex-row flex-wrap gap-3 md:gap-6 text-neutral-500 mb-4">
                    <div className="flex items-center">
                        <MapPin className="w-4 h-4 inline-block mr-1" />
                        <span className="text-xs sm:text-sm whitespace-nowrap">
                            {data.area}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 inline-block mr-1" />
                        <span className="text-xs sm:text-sm whitespace-nowrap">
                            {data.workModality}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <DollarCurrency className="w-4 h-4 inline-block mr-1" />
                        <span className="text-xs sm:text-sm whitespace-nowrap">
                            {data.minSalary + "-" + data.maxSalary}
                        </span>
                    </div>
                    <div className="hidden xl:flex items-center">
                        <Calendar className="w-4 h-4 inline-block mr-1" />
                        <span className="text-xs sm:text-sm whitespace-nowrap">
                            {moment(data.updatedTime).fromNow()}
                        </span>
                    </div>
                </div>
                <p
                    className="ql-editor !text-neutral-600 !text-sm !hidden sm:!block !p-0"
                    dangerouslySetInnerHTML={{
                        __html: data.content.description,
                    }}
                ></p>
            </div>
        </div>
    );
};

export default JobCard;
