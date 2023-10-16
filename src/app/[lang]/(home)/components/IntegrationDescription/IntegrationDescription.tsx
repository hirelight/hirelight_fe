import React from "react";

import styles from "./IntegrationDescription.module.scss";

interface IIntegrationDescription {
    _t: any;
}

const IntegrationDescription: React.FC<IIntegrationDescription> = ({ _t }) => {
    return (
        <div className=" w-full flex flex-col items-center gap-5">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center px-9">
                {_t.title.normal}{" "}
                <span className={styles.title__gradient}>
                    {_t.title.highlight}
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
