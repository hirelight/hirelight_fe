import Link from "next/link";
import React from "react";

import { getDictionary } from "../../../../utils/dictionaries/dictionnary";
import { Locale } from "../../../../../i18n.config";

import NewOrganizationForm from "./components/NewOrganizationForm";

const NewOrganization = async ({ params }: { params: { lang: Locale } }) => {
    const {} = await getDictionary(params.lang);
    return (
        <div className="max-w-[400px] min-h-[400px] relative bg-white shadow-lg rounded-md mx-0 md:mx-6 text-center">
            <NewOrganizationForm />
            <div className="mt-2 mb-8 text-sm text-center relative">
                <span className="text-gray-500 mr-1">Make a mistake?</span>
                <Link
                    href={"/signup"}
                    className="font-semibold text-blue-600 hover:cursor-pointer hover:underline"
                >
                    Start again
                </Link>
            </div>
        </div>
    );
};

export default NewOrganization;
