import React from "react";

interface IEducationSection {
    datas: {
        id: number;
        degree: string;
        field_of_study: string;
        school: string;
        start_date: string;
        end_date: string | null;
        source: string;
    }[];
}

const EducationSection = ({ datas }: IEducationSection) => {
    return (
        <div>
            <div className="mb-6">
                <strong className="text-sm text-neutral-600 uppercase">
                    Education
                </strong>
            </div>
            <div>
                {datas.map(edu => {
                    const startDate = new Date(edu.start_date);
                    const endDate = new Date(edu.end_date!!);

                    return (
                        <div key={edu.id} className={`mb-4 last:mb-0`}>
                            <div className="flex">
                                <div className="basis-40 mr-6 text-sm text-neutral-500 flex gap-2">
                                    <span>{startDate.getFullYear()}</span>-
                                    <span>{endDate.getFullYear()}</span>
                                </div>
                                <div className="w-full flex flex-col gap-2 items-start text-neutral-600 text-sm">
                                    <p>
                                        <strong>{edu.degree}</strong> in{" "}
                                        <strong>{edu.field_of_study}</strong> at{" "}
                                        <strong>{edu.school}</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EducationSection;
