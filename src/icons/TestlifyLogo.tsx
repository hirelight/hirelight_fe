import Image from "next/image";

import logo from "/public/images/integrations/testlify.png";

import React from "react";

import { IIcon } from "./icon.interface";

const TestlifyLogo = ({ className }: IIcon) => {
    return (
        <Image
            alt="Testlify Logo"
            src={logo}
            width={200}
            height={200}
            className={className}
        />
    );
};

export default TestlifyLogo;
