import React from "react";
import Image from "next/image";

import styles from "./FeatureSection.module.scss";

interface IFeatureSection {
    _t: any;
}

const FeatureSection: React.FC<IFeatureSection> = ({ _t }) => {
    return (
        <div className="w-full flex min-h-screen overflow-hidden relative">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1920"
                height="846"
                viewBox="0 0 1920 846"
                fill="none"
                className="hidden md:block absolute -right-80 bottom-6"
            >
                <path
                    d="M0 111.003C0 111.003 302.195 17.7577 526.567 22.4097C810.268 28.2919 884.551 73.0093 1165.03 99.9865C1314.82 114.394 1432.01 21.7422 1580.45 2.72243C1698.51 -12.404 1924.5 40.4366 1924.5 40.4366V846H0V111.003Z"
                    fill="#47A7FF"
                />
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1920"
                height="846"
                viewBox="0 0 1920 846"
                fill="none"
                className="hidden md:block absolute bottom-0 right-0"
            >
                <path
                    d="M0 111.003C0 111.003 302.195 17.7577 526.567 22.4097C810.268 28.2919 884.551 73.0093 1165.03 99.9865C1314.82 114.394 1432.01 21.7422 1580.45 2.72243C1698.51 -12.404 1924.5 40.4366 1924.5 40.4366V846H0V111.003Z"
                    fill="#F2F7FE"
                />
            </svg>
            <div className="z-10 flex-1 w-full max-w-screen-xl mx-auto flex flex-col items-center px-6 gap-14">
                <h1 className="text-4xl md:text-6xl font-semibold pt-10 md:pt-[30vh]">
                    <span className={styles.title__gradient}>
                        {_t.title.normal}
                    </span>{" "}
                    {_t.title.highlight}
                </h1>
                <ul className="grid grid-rows-4 md:grid-cols-4 md:grid-rows-none gap-8 md:gap-0">
                    <li className="flex flex-col items-center gap-4 md:gap-10">
                        <div className="w-44 md:w-40 lg:w-52 aspect-square flex items-center justify-center bg-sky-200 rounded-full drop-shadow-md">
                            <Image
                                src={"/images/feature1.png"}
                                alt="Feature Image"
                                width={50}
                                height={112}
                                className="h-24 md:h-20 lg:h-28 w-auto object-contain"
                            />
                        </div>
                        <p className="w-2/3 md:w-4/5 text-base lg:text-xl text-center font-medium text-neutral-600">
                            {_t.feature_1_description}
                        </p>
                    </li>
                    <li className="flex flex-col items-center gap-4 md:gap-10">
                        <div className="w-44 md:w-40 lg:w-52 aspect-square flex items-center justify-center bg-sky-200 rounded-full drop-shadow-md">
                            <Image
                                src={"/images/feature2.png"}
                                alt="Feature Image"
                                width={50}
                                height={112}
                                className="h-24 md:h-20 lg:h-28 w-auto object-contain"
                            />
                        </div>
                        <p className="w-2/3 md:w-4/5 text-base lg:text-xl text-center font-medium text-neutral-600">
                            {_t.feature_2_description}
                        </p>
                    </li>
                    <li className="flex flex-col items-center gap-4 md:gap-10">
                        <div className="w-44 md:w-40 lg:w-52 aspect-square flex items-center justify-center bg-sky-200 rounded-full drop-shadow-md">
                            <Image
                                src={"/images/feature3.png"}
                                alt="Feature Image"
                                width={50}
                                height={112}
                                className="h-24 md:h-20 lg:h-28 w-auto object-contain"
                            />
                        </div>
                        <p className="w-2/3 md:w-4/5 text-base lg:text-xl text-center font-medium text-neutral-600">
                            {_t.feature_3_description}
                        </p>
                    </li>
                    <li className="flex flex-col items-center gap-4 md:gap-10">
                        <div className="w-44 md:w-40 lg:w-52 aspect-square flex items-center justify-center bg-sky-200 rounded-full drop-shadow-md">
                            <Image
                                src={"/images/feature4.png"}
                                alt="Feature Image"
                                width={50}
                                height={112}
                                className="h-24 md:h-20 lg:h-28 w-auto object-contain"
                            />
                        </div>
                        <p className="w-2/3 md:w-4/5 text-base lg:text-xl text-center font-medium text-neutral-600">
                            {_t.feature_4_description}
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default FeatureSection;
