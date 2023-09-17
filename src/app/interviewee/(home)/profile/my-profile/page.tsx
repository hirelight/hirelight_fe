import Image from "next/image";
import React from "react";

import logo from "/public/images/logo.png";

import ApplicationForm from "./components/ApplicationForm";

const MyProfile = () => {
    return (
        <div className="px-20 flex flex-col items-center">
            <Image
                alt="Avatar"
                src={logo}
                width={135}
                height={135}
                className="rounded-full border-2 border-blue_primary_800 object-contain mb-6"
            />
            <ApplicationForm />
        </div>
    );
};

export default MyProfile;
