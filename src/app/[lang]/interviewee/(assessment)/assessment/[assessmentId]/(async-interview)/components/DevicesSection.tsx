import React, { useMemo, useRef } from "react";

import { Selection } from "@/components";

import { useAsyncVideoAssessment } from "./AsyncVideoAssessment";

const DevicesSection = () => {
    const { devices, asyncError } = useAsyncVideoAssessment();
    const audioDevices = useMemo(
        () => devices.filter(item => item.kind === "audioinput"),
        [devices]
    );
    const videoDevices = useMemo(
        () => devices.filter(item => item.kind === "videoinput"),
        [devices]
    );

    return (
        <React.Fragment>
            <section>
                <h3 className="text-sm text-gray-500 font-semibold mb-2">
                    Camera
                </h3>
                <Selection
                    title=""
                    value={videoDevices[0] ? videoDevices[0].label : ""}
                    items={videoDevices.map(item => ({
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
                    value={audioDevices[0] ? audioDevices[0].label : ""}
                    items={audioDevices.map(item => ({
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
