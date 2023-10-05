import Link from "next/link";
import React from "react";

import NewOrganizationForm from "./components/NewOrganizationForm";

const NewOrganization = () => {
    return (
        <div className="max-w-[400px] min-h-[400px] relative bg-white shadow-lg rounded-md mx-0 md:mx-6 text-center">
            <NewOrganizationForm />
            <div className="mt-2 mb-8 text-sm text-center relative">
                <span className="text-gray-500 mr-1">Make a mistake?</span>
                <Link
                    href={"/login"}
                    className="font-semibold text-blue-600 hover:cursor-pointer hover:underline"
                >
                    Start again
                </Link>
            </div>
        </div>
    );
};

export default NewOrganization;
