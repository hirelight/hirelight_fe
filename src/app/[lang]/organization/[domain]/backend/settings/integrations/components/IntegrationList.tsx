"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";

import integrationServices from "@/services/integration/integration.service";
import { Button, ButtonOutline, CustomInput } from "@/components";
import { ICreateIntegrationDto, IIntegrationDto } from "@/services";

import IntegrationCard from "./IntegrationCard";

const IntegrationList = () => {
    const [editItem, setEditItem] = useState<IIntegrationDto>();
    const [addState, setAddState] = useState<ICreateIntegrationDto>({
        service: "",
        payload: "",
    });

    const queryClient = useQueryClient();
    const {
        data: integrationRes,
        error,
        isFetched,
    } = useQuery({
        queryKey: ["integrations"],
        queryFn: integrationServices.getList,
    });

    return (
        <div className="bg-white rounded-md drop-shadow-lg">
            <ul>
                {integrationRes?.data.map(integration => (
                    <li
                        key={integration.service}
                        onClick={() => setEditItem(integration)}
                        className="border-b border-gray-300 last:border-b-0"
                    >
                        <IntegrationCard data={integration} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IntegrationList;
