import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { produce } from "immer";

import { ButtonOutline, CustomInput } from "@/components";
import {
    ICreateIntegrationDto,
    IEditIntegrationDto,
    IIntegrationDto,
} from "@/services";
import integrationServices from "@/services/integration/integration.service";
import { IUserInfo } from "@/interfaces/user.interface";

type IntegrationCardProps = {
    data: IIntegrationDto;
};

const IntegrationCard: React.FC<IntegrationCardProps> = ({ data }) => {
    const queryClient = useQueryClient();
    const [integration, setIntegration] = useState(data);
    const [integrationOrgName, setIntegrationOrgName] = useState(
        data.token ? data.token.payload.split(",")[0] : ""
    );
    const [integrationToken, setIntegrationToken] = useState(
        data.token ? data.token.payload.split(",")[1] : ""
    );

    const handleDeleteIntegration = async (id: string) => {
        try {
            const getIdRes = await integrationServices.getTokenById(id);
            const res = await integrationServices.deleteById(getIdRes.data.id);

            toast.success(res.message);
            queryClient.invalidateQueries({ queryKey: ["integrations"] });
        } catch (error: any) {
            toast.error(error.message ? error.message : "Something went wrong");
        }
    };

    const handleUpdateIntegration = async (updateDto: IEditIntegrationDto) => {
        try {
            const res = await integrationServices.edit(updateDto);

            toast.success(res.message);
            queryClient.invalidateQueries({ queryKey: ["integrations"] });
        } catch (error: any) {
            toast.error(error.message ? error.message : "Something went wrong");
        }
    };

    const handleCreateIntegration = async (creatDto: ICreateIntegrationDto) => {
        try {
            const res = await integrationServices.createNew(creatDto);

            toast.success(res.message);
            queryClient.invalidateQueries({ queryKey: ["integrations"] });
        } catch (error: any) {
            toast.error(error.message ? error.message : "Something went wrong");
        }
    };

    const handelSaveChange = async () => {
        if (!integrationToken && !integrationOrgName)
            handleDeleteIntegration(integration.token?.id!!);
        else if (integration.token) {
            handleUpdateIntegration({
                id: integration.token.id,
                service: integration.token.service,
                payload: `${integrationOrgName},${integrationToken}`,
            });
        } else {
            handleCreateIntegration({
                service: integration.service,
                payload: `${integrationOrgName},${integrationToken}`,
            });
        }
    };

    useEffect(() => {
        setIntegration(data);
    }, [data]);

    return (
        <>
            <CustomInput title="Service" value={integration.service} readOnly />
            <CustomInput
                title="Integration organization name"
                value={integrationOrgName}
                onChange={e => setIntegrationOrgName(e.target.value)}
            />
            <CustomInput
                title="Token"
                value={integrationToken}
                onChange={e => setIntegrationToken(e.target.value)}
            />
            <div>
                <ButtonOutline onClick={handelSaveChange}>Save</ButtonOutline>
            </div>
        </>
    );
};

export default IntegrationCard;
