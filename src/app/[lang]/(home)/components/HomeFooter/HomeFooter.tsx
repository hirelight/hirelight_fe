import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";

import { getI18NextTranslation } from "@/utils/i18n";

interface IHomeFooter {
    lang: any;
}

const today = new Date();

const HomeFooter: React.FC<IHomeFooter> = async ({ lang }) => {
    const { t: _t } = await getI18NextTranslation(lang, "home", {
        keyPrefix: "footer",
    });
    return (
        <footer className="bg-blue_primary_600 pt-8 md:pt-10  pb-12 md:pb-14 px-6">
            <div className="max-w-screen-xl w-full mx-auto">
                <div className="flex justify-center md:justify-between">
                    <div className="flex gap-2 items-center">
                        <Image
                            alt="Hirelight Logo"
                            src={"/logo.svg"}
                            width={100}
                            height={100}
                            className="w-10 md:w-14 h-auto object-contain"
                        />
                        <h3 className="text-2xl md:text-4xl text-white font-semibold">
                            Hirelight
                        </h3>
                    </div>
                    <nav className="hidden md:block">
                        <ul className="flex gap-12 font-medium text-xl text-white">
                            <li className={``}>
                                <Link href={"#"}>{_t("nav.home")}</Link>
                            </li>
                            <li className="hover:text-slate-200">
                                <Link href={"#"}>{_t("nav.pages")}</Link>
                            </li>
                            <li className="hover:text-slate-200">
                                <Link href={"/contact"}>
                                    {_t("nav.contact")}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <hr className="w-full h-[1px] bg-slate-300 my-6 mb-12" />
                <div>
                    <p className="text-slate-100 text-sm text-center">
                        <Trans t={_t} i18nKey={"copyright"}>
                            {{ year: today.getFullYear() }} copyrights by
                            Hirelight . All Rights Reserved.
                        </Trans>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default HomeFooter;
