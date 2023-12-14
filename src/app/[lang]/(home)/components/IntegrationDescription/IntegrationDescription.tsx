import React from "react";

import { getI18NextTranslation } from "@/utils/i18n";

import { Locale } from "../../../../../../i18n.config";

import styles from "./IntegrationDescription.module.scss";

interface IIntegrationDescription {
    lang: string;
}

const IntegrationDescription: React.FC<IIntegrationDescription> = async ({
    lang,
}) => {
    const { t: _t } = await getI18NextTranslation(lang as Locale, "home", {
        keyPrefix: "integration_section.title",
    });
    return (
        <div className=" w-full flex flex-col items-center gap-5">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center px-9">
                {_t("normal")}{" "}
                <span className={styles.title__gradient}>
                    {_t("highlight")}
                </span>
            </h1>
            <div className={styles.itegration__wrapper}>
                {/* <Image
          alt='Itegration'
          src={integration}
          className='w-full h-auto object-contain'
        /> */}
            </div>
        </div>
    );
};

export default IntegrationDescription;
