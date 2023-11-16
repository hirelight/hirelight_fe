import React from "react";
import Image from "next/image";

import logo from "/public/images/logo.svg";

const HeaderBar = () => {
    return (
        <div className="text-center w-full h-fit flex items-center justify-center py-4 bg-white drop-shadow-md">
            <div className="flex gap-2 items-center">
                <span>
                    <Image
                        alt="Hirelight Logo"
                        src={logo}
                        width={40}
                        height={40}
                    />
                </span>
                <h1 className="text-2xl tracking-wider font-semibold italic">
                    Hirelight
                </h1>
            </div>
        </div>
    );
};

export default HeaderBar;
