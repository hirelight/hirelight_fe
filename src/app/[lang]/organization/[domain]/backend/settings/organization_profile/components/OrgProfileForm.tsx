"use client";

import React, { createContext, useEffect, useState } from "react";

import organizationsServices from "@/services/organizations/organizations.service";
import { IOrganizationDto } from "@/services";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useAppSelector } from "@/redux/reduxHooks";

type OrgProfileFormState = {
    orgData: IOrganizationDto;
    setOrgData: React.Dispatch<React.SetStateAction<IOrganizationDto>>;
};

const OrgProfileFormContext = createContext<OrgProfileFormState | null>(null);

export const useOrgProfileForm = (): OrgProfileFormState => {
    const context = React.useContext(OrgProfileFormContext);

    if (!context)
        throw new Error("Please use ThemeProvider in your parent component!");

    return context;
};

type OrgProfileFormProps = {
    children: React.ReactNode;
};

const OrgProfileForm: React.FC<OrgProfileFormProps> = ({ children }) => {
    const authUser = useAppSelector(state => state.auth.authUser!!);
    const [orgData, setOrgData] = useState<IOrganizationDto>({
        id: "",
        name: "",
        subdomain: "",
        logoUrl: null,
        description: null,
        introduction: null,
        industry: null,
        numberOfEmployees: null,
        nationality: null,
        address: null,
        location: null,
        ownerId: "",
        createdTime: new Date(),
        updatedTime: new Date(),
    });

    useEffect(() => {
        const getOrg = async (id: string) => {
            try {
                const res = await organizationsServices.getByIdAsync(id);
                console.log(res);
                setOrgData(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (authUser.organizationId) getOrg(authUser.organizationId);
    }, [authUser.organizationId]);
    if (!orgData)
        return (
            <div>
                <LoadingIndicator />
            </div>
        );

    return (
        <OrgProfileFormContext.Provider value={{ orgData, setOrgData }}>
            {children}
        </OrgProfileFormContext.Provider>
    );
};

export default OrgProfileForm;
