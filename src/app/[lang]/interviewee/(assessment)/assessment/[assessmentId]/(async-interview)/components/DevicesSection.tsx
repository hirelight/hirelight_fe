import React from "react";

import { Selection } from "@/components";

import { useAsyncVideoAssessment } from "./AsyncVideoAssessment";

const DevicesSection = () => {
    const { devices, asyncError } = useAsyncVideoAssessment();

    return (
        <React.Fragment>
            <section>
                <h3 className="text-sm text-gray-500 font-semibold mb-2">
                    Camera
                </h3>
                <Selection
                    title=""
                    items={devices
                        .filter(item => item.kind === "videoinput")
                        .map(item => ({
                            label: item.label,
                            value: item,
                        }))}
                    onChange={() => {}}
                />
                {asyncError.deviceErr.camErr && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">
                            {asyncError.deviceErr.camErr}{" "}
                        </span>
                    </p>
                )}
            </section>

            <div className="h-[1px] w-full bg-gray-300 my-4"></div>

            <section className="mb-4">
                <h3 className="text-sm text-gray-500 font-semibold mb-2">
                    Microphone
                </h3>
                <Selection
                    title=""
                    items={devices
                        .filter(item => item.kind === "audioinput")
                        .map(item => ({
                            label: item.label,
                            value: item,
                        }))}
                    onChange={() => {}}
                />
                {asyncError.deviceErr.micErr && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">
                            {asyncError.deviceErr.micErr}{" "}
                        </span>
                    </p>
                )}
            </section>
        </React.Fragment>
    );
};

export default DevicesSection;
