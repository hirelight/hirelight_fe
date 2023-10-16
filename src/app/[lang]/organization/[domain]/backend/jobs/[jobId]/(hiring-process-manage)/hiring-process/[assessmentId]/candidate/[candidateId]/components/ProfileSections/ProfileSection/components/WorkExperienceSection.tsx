import React from "react";

interface IWorkExperienceSection {
    datas: {
        id: number;
        title: string;
        summary: string;
        company: string;
        industry: string;
        start_date: string;
        end_date: string | null;
        current: boolean;
        source: string;
    }[];
}

const WorkExperienceSection = ({ datas }: IWorkExperienceSection) => {
    return (
        <div>
            <div className="mb-6">
                <strong className="text-sm text-neutral-600 uppercase">
                    Work Experience
                </strong>
            </div>
            <div>
                {datas.map(experience => {
                    const startDate = new Date(experience.start_date);
                    const endDate = new Date(experience.end_date!!);

                    return (
                        <div key={experience.id} className={`mb-4 last:mb-0`}>
                            <div className="flex">
                                <div className="basis-40 mr-6 text-sm text-neutral-500 flex gap-2">
                                    <span>{startDate.getFullYear()}</span>-
                                    <span>
                                        {experience.current
                                            ? "now"
                                            : endDate.getFullYear()}
                                    </span>
                                </div>
                                <div className="w-full flex flex-col gap-2 items-start text-neutral-600 text-sm">
                                    <p>
                                        <strong>{experience.title}</strong> at{" "}
                                        <strong>{experience.industry}</strong>
                                    </p>
                                    <p>{experience.summary}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WorkExperienceSection;
