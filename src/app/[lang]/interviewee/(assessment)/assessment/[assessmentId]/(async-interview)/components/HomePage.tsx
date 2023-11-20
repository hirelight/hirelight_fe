import Image from "next/image";
import React from "react";

import logo from "/public/images/logo.svg";

import styles from "./AsyncVideoAssessment.module.scss";

const HomePage = () => {
    return (
        <div>
            <div className={styles.banner}>
                <div className="w-40 aspect-square p-6 rounded-full bg-white overflow-hidden drop-shadow-lg">
                    <Image
                        src={logo}
                        alt="Company logo"
                        width={180}
                        height={180}
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
