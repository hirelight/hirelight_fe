"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";

import integrationServices from "@/services/integration/integration.service";
import { Button, ButtonOutline, CustomInput } from "@/components";
import { ICreateIntegrationDto, IIntegrationDto } from "@/services";

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

    const handleCreateIntegration = async () => {
        try {
            const res = await integrationServices.createNew(addState);

            toast.success(res.message);
            queryClient.invalidateQueries({ queryKey: ["integrations"] });
        } catch (error: any) {
            toast.error(error.message ? error.message : "Something went wrong");
        }
    };

    const handleUpdateIntegration = async () => {
        if (!editItem) return;
        try {
            const res = await integrationServices.edit({
                id: editItem.id,
                service: editItem.service,
                payload: editItem.payload,
            });

            toast.success(res.message);
            queryClient.invalidateQueries({ queryKey: ["integrations"] });
        } catch (error: any) {
            toast.error(error.message ? error.message : "Something went wrong");
        }
    };

    const handleDeleteIntegration = async (id: string) => {
        try {
            const getIdRes = await integrationServices.getById(id);
            const res = await integrationServices.deleteById(getIdRes.data.id);

            toast.success(res.message);
            queryClient.invalidateQueries({ queryKey: ["integrations"] });
        } catch (error: any) {
            toast.error(error.message ? error.message : "Something went wrong");
        }
    };

    return (
        <div>
            <ul>
                {integrationRes?.data.map(integration => (
                    <li
                        key={integration.id}
                        onClick={() => setEditItem(integration)}
                    >
                        <p>
                            Service: <span>{integration.service}</span>
                        </p>
                        <p>
                            Payload: <span>{integration.payload}</span>
                        </p>
                        <ButtonOutline
                            onClick={handleDeleteIntegration.bind(
                                null,
                                integration.id
                            )}
                        >
                            Delete
                        </ButtonOutline>
                    </li>
                ))}
            </ul>

            <section>
                <h4>
                    <strong>Create Integration</strong>
                </h4>

                <CustomInput
                    title="Service"
                    value={addState.service}
                    onChange={e =>
                        setAddState({ ...addState, service: e.target.value })
                    }
                    required
                />

                <CustomInput
                    title="Payload"
                    value={addState.payload}
                    onChange={e =>
                        setAddState({ ...addState, payload: e.target.value })
                    }
                    required
                />
                <Button onClick={handleCreateIntegration}>Save</Button>
            </section>

            {editItem && (
                <section>
                    <h4>
                        <strong>Edit Integration</strong>
                    </h4>

                    <CustomInput
                        title="Service"
                        value={editItem.service}
                        required
                    />

                    <CustomInput
                        title="Payload"
                        onChange={e =>
                            setEditItem({
                                ...editItem,
                                payload: e.target.value,
                            })
                        }
                        required
                    />

                    <Button onClick={handleUpdateIntegration}>Save</Button>
                </section>
            )}
        </div>
    );
};

export default IntegrationList;
