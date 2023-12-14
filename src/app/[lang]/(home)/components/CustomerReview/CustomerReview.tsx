import React from "react";

import globe from "/public/images/globe_outline.png";
import appstore from "/public/images/appstore.png";

import Image from "next/image";

import downloads from "/public/images/downloads.png";
import review1 from "/public/images/review1.png";
import review2 from "/public/images/review2.png";
import review3 from "/public/images/review3.png";

import { Trans } from "react-i18next/TransWithoutContext";

import { getI18NextTranslation } from "@/utils/i18n";

import { Locale } from "../../../../../../i18n.config";

import styles from "./CustomerReview.module.scss";

interface ICustomerReview {
    lang: string;
}

const CustomerReview: React.FC<ICustomerReview> = async ({ lang }) => {
    const { t: _t } = await getI18NextTranslation(lang as Locale, "home", {
        keyPrefix: "customer_review_section",
    });

    const RatingStar = () => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="115"
                height="21"
                viewBox="0 0 115 21"
                fill="none"
            >
                <path
                    d="M9.05506 3.29293C9.39183 2.25646 10.8582 2.25646 11.1949 3.29293L12.1456 6.21885C12.2962 6.68237 12.7282 6.9962 13.2156 6.9962L16.2921 6.9962C17.3819 6.9962 17.835 8.39077 16.9533 9.03135L14.4644 10.8397C14.0701 11.1261 13.9051 11.6339 14.0557 12.0975L15.0064 15.0234C15.3432 16.0598 14.1569 16.9217 13.2752 16.2812L10.7863 14.4728C10.392 14.1864 9.85804 14.1864 9.46374 14.4728L6.97481 16.2812C6.09313 16.9217 4.90684 16.0598 5.24361 15.0234L6.1943 12.0974C6.34491 11.6339 6.17992 11.1261 5.78562 10.8397L3.29669 9.03135C2.41501 8.39077 2.86813 6.9962 3.95795 6.9962L7.03444 6.9962C7.52182 6.9962 7.95377 6.68237 8.10437 6.21885L9.05506 3.29293Z"
                    fill="#E7A600"
                />
                <path
                    d="M32.6801 3.29293C33.0168 2.25646 34.4832 2.25646 34.8199 3.29293L35.7706 6.21885C35.9212 6.68237 36.3532 6.9962 36.8406 6.9962L39.9171 6.9962C41.0069 6.9962 41.46 8.39077 40.5783 9.03135L38.0894 10.8397C37.6951 11.1261 37.5301 11.6339 37.6807 12.0975L38.6314 15.0234C38.9682 16.0598 37.7819 16.9217 36.9002 16.2812L34.4113 14.4728C34.017 14.1864 33.483 14.1864 33.0887 14.4728L30.5998 16.2812C29.7181 16.9217 28.5318 16.0598 28.8686 15.0234L29.8193 12.0974C29.9699 11.6339 29.8049 11.1261 29.4106 10.8397L26.9217 9.03135C26.04 8.39077 26.4931 6.9962 27.5829 6.9962L30.6594 6.9962C31.1468 6.9962 31.5788 6.68237 31.7294 6.21885L32.6801 3.29293Z"
                    fill="#E7A600"
                />
                <path
                    d="M56.3051 3.29293C56.6418 2.25646 58.1082 2.25646 58.4449 3.29293L59.3956 6.21885C59.5462 6.68237 59.9782 6.9962 60.4656 6.9962L63.5421 6.9962C64.6319 6.9962 65.085 8.39077 64.2033 9.03135L61.7144 10.8397C61.3201 11.1261 61.1551 11.6339 61.3057 12.0975L62.2564 15.0234C62.5932 16.0598 61.4069 16.9217 60.5252 16.2812L58.0363 14.4728C57.642 14.1864 57.108 14.1864 56.7137 14.4728L54.2248 16.2812C53.3431 16.9217 52.1568 16.0598 52.4936 15.0234L53.4443 12.0974C53.5949 11.6339 53.4299 11.1261 53.0356 10.8397L50.5467 9.03135C49.665 8.39077 50.1181 6.9962 51.2079 6.9962L54.2844 6.9962C54.7718 6.9962 55.2038 6.68237 55.3544 6.21885L56.3051 3.29293Z"
                    fill="#E7A600"
                />
                <path
                    d="M79.9301 3.29293C80.2668 2.25646 81.7332 2.25646 82.0699 3.29293L83.0206 6.21885C83.1712 6.68237 83.6032 6.9962 84.0906 6.9962L87.1671 6.9962C88.2569 6.9962 88.71 8.39077 87.8283 9.03135L85.3394 10.8397C84.9451 11.1261 84.7801 11.6339 84.9307 12.0975L85.8814 15.0234C86.2182 16.0598 85.0319 16.9217 84.1502 16.2812L81.6613 14.4728C81.267 14.1864 80.733 14.1864 80.3387 14.4728L77.8498 16.2812C76.9681 16.9217 75.7818 16.0598 76.1186 15.0234L77.0693 12.0974C77.2199 11.6339 77.0549 11.1261 76.6606 10.8397L74.1717 9.03135C73.29 8.39077 73.7431 6.9962 74.8329 6.9962L77.9094 6.9962C78.3968 6.9962 78.8288 6.68237 78.9794 6.21885L79.9301 3.29293Z"
                    fill="#E7A600"
                />
                <path
                    d="M103.555 3.29293C103.892 2.25646 105.358 2.25646 105.695 3.29293L106.646 6.21885C106.796 6.68237 107.228 6.9962 107.716 6.9962L110.792 6.9962C111.882 6.9962 112.335 8.39077 111.453 9.03135L108.964 10.8397C108.57 11.1261 108.405 11.6339 108.556 12.0975L109.506 15.0234C109.843 16.0598 108.657 16.9217 107.775 16.2812L105.286 14.4728C104.892 14.1864 104.358 14.1864 103.964 14.4728L101.475 16.2812C100.593 16.9217 99.4068 16.0598 99.7436 15.0234L100.694 12.0974C100.845 11.6339 100.68 11.1261 100.286 10.8397L97.7967 9.03135C96.915 8.39077 97.3681 6.9962 98.4579 6.9962L101.534 6.9962C102.022 6.9962 102.454 6.68237 102.604 6.21885L103.555 3.29293Z"
                    fill="#E7A600"
                />
            </svg>
        );
    };

    return (
        <div className="max-w-screen-xl w-full mx-auto px-5 flex flex-col gap-12 md:gap-0 md:flex-row justify-between md:items-center">
            <section className="flex-1 flex flex-col justify-between items-center md:items-start self-stretch gap-10 md:gap-8 md:px-11 md:py-9">
                <div className="text-center flex flex-col items-center md:items-start md:text-left">
                    <h1 className="text-4xl md:text-4xl font-semibold mb-6">
                        {_t("title.normal")}{" "}
                        <span className={styles.title__gradient}>
                            {_t("title.highlight")}
                        </span>
                    </h1>
                    <p className="w-4/5 text-sm md:text-lg text-gray-500">
                        Sorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nunc vulputate libero et velit interdum, ac aliquet odio
                        mattis.
                    </p>
                </div>
                <div className="w-full flex justify-between ">
                    <div className="flex flex-col items-center gap-4">
                        <Image
                            src={downloads}
                            alt="Downloads"
                            className="h-24 w-auto object-contain"
                        />
                        <h2 className="text-3xl font-semibold text-blue_primary_800">
                            2,5M+
                        </h2>
                        <p className="text-gray-700 text-base">
                            {_t("downloaded")}
                        </p>
                    </div>
                    <div className="w-[1px] self-stretch bg-gray-500" />
                    <div className="flex flex-col items-center gap-4">
                        <Image
                            src={appstore}
                            alt="App Store"
                            className="h-24 w-auto object-contain"
                        />
                        <h2 className="text-3xl font-semibold text-blue_primary_800">
                            4.8/5
                        </h2>
                        <p className="text-gray-700 text-base">
                            <Trans t={_t} i18nKey={"rates"}>
                                Based on {{ numOfReviews: "1,258" }} reviews
                            </Trans>
                        </p>
                    </div>
                </div>

                <div className="flex gap-6">
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {_t("btn.see_reviews")}
                    </button>

                    <button
                        type="button"
                        className="flex items-center gap-1 group font-medium hover:font-semibold"
                    >
                        <div className="text-blue-500 group-hover:text-blue-800">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-10 h-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                                />
                            </svg>
                        </div>

                        <span>{_t("btn.view_promote")}</span>
                    </button>
                </div>
            </section>
            <section className="flex-1 relative">
                <Image src={globe} alt="Globe" className={styles.globe_img} />
                <div className="w-full max-w-lg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6">
                    <div className="w-full bg-white rounded-lg p-4 flex items-start gap-3 drop-shadow-md">
                        <Image
                            alt="Review 1"
                            src={review1}
                            className="w-20 aspect-square object-contain"
                        />

                        <div className="flex flex-col items-start">
                            {RatingStar()}
                            <p className="mt-3 mb-1">
                                “You can even send emails to Evernote and
                                gatherall of the things you need in a single
                                place.”
                            </p>
                            <p className="text-xs text-gray-500">
                                JURGEN K. / Senior Marketing At{" "}
                                <span className="text-blue_primary_600">
                                    Brator
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="w-full bg-white rounded-lg p-4 flex items-start gap-3 drop-shadow-md">
                        <Image
                            alt="Review 2"
                            src={review2}
                            className="w-20 aspect-square object-contain"
                        />

                        <div className="flex flex-col items-start">
                            {RatingStar()}
                            <p className="mt-3 mb-1">
                                “Notero - 1st my choice for notes app. Awesome”
                            </p>
                            <p className="text-xs text-gray-500">
                                FODEN P. / Director At{" "}
                                <span className="text-blue_primary_600">
                                    Ecoland Resort
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="w-full bg-white rounded-lg p-4 flex items-start gap-3 drop-shadow-md">
                        <Image
                            alt="Review 3"
                            src={review3}
                            className="w-20 aspect-square object-contain"
                        />

                        <div className="flex flex-col items-start">
                            {RatingStar()}
                            <p className="mt-3 mb-1">
                                “.This app is seriously good. It’s simple, clean
                                anda real joy to use.”
                            </p>
                            <p className="text-xs text-gray-500">
                                KERRY T. / Designer At{" "}
                                <span className="text-blue_primary_600">
                                    Teckzone Inc
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CustomerReview;
