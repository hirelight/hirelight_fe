import React from "react";

import logo from "/public/images/logo.png";

import Image from "next/image";

const HeaderBar = () => {
    return (
        <div className="text-center w-full h-fit flex items-center justify-center py-4 bg-white drop-shadow-md">
            <div className="flex gap-2 items-center">
                <span>
                    <Image
                        alt="Hirelight Logo"
                        src={"/images/logo.png"}
                        width={40}
                        height={40}
                    />
                </span>
                <h1 className="text-2xl font-semibold italic">Hirelight</h1>
            </div>
        </div>
    );
};

export default HeaderBar;
