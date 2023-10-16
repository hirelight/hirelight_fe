import React from "react";

import styles from "./JoinSection.module.scss";

import Image from "next/image";

import joinPoster from "/public/images/join_poster.jpg";

interface IJoinSection {
    _t: any;
}

const JoinSection: React.FC<IJoinSection> = ({ _t }) => {
    return (
        <div className="max-w-screen-xl mx-auto w-full flex flex-col gap-20 px-6">
            <section>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center px-9 mb-12">
                    {_t.join_community.title.normal}{" "}
                    <span className={styles.title__gradient}>
                        {_t.join_community.title.highlight}
                    </span>
                </h1>
                <div className="w-full border border-gray-500 rounded-3xl py-10 px-12 lg:px-16 flex flex-col gap-9 md:gap-0 md:flex-row md:justify-between items-center">
                    <div className="flex items-center gap-2 lg:gap-4">
                        <Image
                            src={"/images/github.png"}
                            alt="Github"
                            width={82}
                            height={82}
                            className="w-24 md:w-16 aspect-square lg:w-auto"
                        />
                        <div className="flex flex-col gap-2">
                            <h1 className="text-neutral-700 text-2xl md:text-xl lg:text-3xl font-semibold">
                                Github
                            </h1>
                            <p className="text-neutral-500 text-sm lg:text-base">
                                {_t.join_community.community.github.description}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 lg:gap-4">
                        <Image
                            src={"/images/twitter.png"}
                            alt="Twitter"
                            width={82}
                            height={82}
                            className="w-24 md:w-16 aspect-square lg:w-auto"
                        />
                        <div className="flex flex-col gap-2">
                            <h1 className="text-neutral-700 text-2xl md:text-xl lg:text-3xl font-semibold">
                                Tweeter
                            </h1>
                            <p className="text-neutral-500 text-sm lg:text-base">
                                {
                                    _t.join_community.community.tweeter
                                        .description
                                }
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 lg:gap-4">
                        <Image
                            src={"/images/telegram.png"}
                            alt="Telegram"
                            width={82}
                            height={82}
                            className="w-24 md:w-16 aspect-square lg:w-auto"
                        />
                        <div className="flex flex-col gap-2">
                            <h1 className="text-neutral-700 text-2xl md:text-xl lg:text-3xl font-semibold">
                                Telegram
                            </h1>
                            <p className="text-neutral-500 text-sm lg:text-base">
                                {
                                    _t.join_community.community.telegram
                                        .description
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex flex-col items-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center px-9 mb-8">
                    {_t.ready_experience.title.normal}{" "}
                    <span className={styles.title__gradient}>
                        {_t.ready_experience.title.highlight}
                    </span>
                </h1>
                <p className="text-sm md:text-base text-gray-500 ">
                    {_t.ready_experience.subtitle.replace("{{days}}, 15")}
                </p>
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm md:text-base text-gray-500 my-14 ">
                    <p>{_t.ready_experience.btn.sign_up_google}</p>
                    <p>{_t.ready_experience.btn.sign_up_linkedin}</p>
                </div>
                <Image
                    alt="Poster"
                    src={joinPoster}
                    className="max-w-[660px] w-full aspect-video object-cover rounded-tr-2xl  rounded-tl-[200px] rounded-bl-2xl rounded-br-[200px] border-2 border-blue-500"
                />
            </section>
        </div>
    );
};

export default JoinSection;
