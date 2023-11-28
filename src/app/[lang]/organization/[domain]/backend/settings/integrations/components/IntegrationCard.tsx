import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

import { ButtonOutline, CustomInput } from "@/components";
import {
    ICreateIntegrationDto,
    IEditIntegrationDto,
    IIntegrationDto,
} from "@/services";
import integrationServices from "@/services/integration/integration.service";
import { supportServices } from "@/utils/constants/integrations";
import { HackerrankIcon, TestlifyLogo } from "@/icons";

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
        data.token
            ? data.token.payload.split(",")[
                  data.service === "HACKERRANK" ? 0 : 1
              ]
            : ""
    );
    const [showConfig, setShowConfig] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDeleteIntegration = async (id: string) => {
        setLoading(true);
        try {
            const getIdRes = await integrationServices.getTokenById(id);
            const res = await integrationServices.deleteById(getIdRes.data.id);

            toast.success(res.message);
            queryClient.invalidateQueries({ queryKey: ["integrations"] });
        } catch (error: any) {
            toast.error(error.message ? error.message : "Something went wrong");
        }
        setLoading(false);
    };

    const handleUpdateIntegration = async (updateDto: IEditIntegrationDto) => {
        setLoading(true);
        try {
            const res = await integrationServices.edit(updateDto);

            toast.success(res.message);
            queryClient.invalidateQueries({ queryKey: ["integrations"] });
        } catch (error: any) {
            toast.error(error.message ? error.message : "Something went wrong");
        }
        setLoading(false);
    };

    const handleCreateIntegration = async (creatDto: ICreateIntegrationDto) => {
        setLoading(true);
        try {
            const res = await integrationServices.createNew(creatDto);

            toast.success(res.message);
            queryClient.invalidateQueries({ queryKey: ["integrations"] });
        } catch (error: any) {
            toast.error(error.message ? error.message : "Something went wrong");
        }
        setLoading(false);
    };

    const handelSaveChange = async () => {
        if (!integrationToken && !integrationOrgName)
            handleDeleteIntegration(integration.token?.id!!);
        else if (integration.token) {
            handleUpdateIntegration({
                id: integration.token.id,
                service: integration.token.service,
                payload:
                    data.service === "HACKERRANK"
                        ? integrationToken
                        : `${integrationOrgName},${integrationToken}`,
            });
        } else {
            handleCreateIntegration({
                service: integration.service,
                payload:
                    data.service === "HACKERRANK"
                        ? integrationToken
                        : `${integrationOrgName},${integrationToken}`,
            });
        }
    };

    useEffect(() => {
        setIntegration(data);
    }, [data]);

    return (
        <div>
            <div
                className={
                    "py-4 px-6 text-sm flex items-start cursor-default group hover:bg-amber-100/60" +
                    ` ${showConfig ? "bg-amber-100/60" : ""}`
                }
            >
                {data.service === supportServices.HACKERRANK ? (
                    <HackerrankIcon className="w-14 h-14" />
                ) : (
                    <TestlifyLogo className="w-14 h-auto object-cover" />
                )}
                <div className="flex-1 ml-4">
                    <h3 className="mb-2">
                        <strong>{data.service}</strong>
                    </h3>
                    <p className="text-gray-600">
                        {data.service === supportServices.HACKERRANK
                            ? "HackerRank is the industry standard, end-to-end technical skills assessment platform that helps companies across industries to better evaluate, interview, and hire software developers."
                            : `Criteria is an assessment company dedicated to helping
                        organizations make better talent decisions using
                        objective, multidimensional data. By combining
                        leading-edge data science with rigorous validation
                        backed by I/O psychologists, we provide the most precise
                        assessments available.`}
                    </p>
                </div>
                <div className="self-center px-4">
                    <button
                        type="button"
                        className="font-semibold text-blue_primary_600 invisible group-hover:visible hover:text-blue_primary_800 hover:underline"
                        onClick={() => setShowConfig(!showConfig)}
                    >
                        Settings
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {showConfig && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            height: 0,
                        }}
                        animate={{
                            opacity: 1,
                            height: "auto",
                            transition: {
                                ease: "easeOut",
                                duration: 0.15,
                                opacity: {
                                    delay: 0.15,
                                    duration: 0.2,
                                },
                            },
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                            transition: {
                                ease: "easeIn",
                                duration: 0.15,
                                height: {
                                    delay: 0.15,
                                    duration: 0.2,
                                },
                            },
                        }}
                    >
                        <div className="p-6 space-y-4">
                            {data.service !== "HACKERRANK" && (
                                <CustomInput
                                    title="Integration organization name"
                                    value={integrationOrgName}
                                    onChange={e =>
                                        setIntegrationOrgName(e.target.value)
                                    }
                                    required
                                />
                            )}
                            <CustomInput
                                title="Token"
                                value={integrationToken}
                                onChange={e =>
                                    setIntegrationToken(e.target.value)
                                }
                                required
                            />
                            <ButtonOutline
                                disabled={loading}
                                isLoading={loading}
                                onClick={handelSaveChange}
                            >
                                Update setting
                            </ButtonOutline>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default IntegrationCard;
