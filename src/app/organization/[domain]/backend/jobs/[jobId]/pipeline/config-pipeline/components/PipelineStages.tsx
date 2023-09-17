import Image from "next/image";
import React from "react";

import { pipelineStages } from "@/utils/shared/initialDatas";

import styles from "./PipelineStages.module.scss";

interface IPipelineStages {
    selectedId: number;
    onSelect: (id: number) => void;
}

const PipelineStages = ({ selectedId, onSelect }: IPipelineStages) => {
    return (
        <aside>
            <ul className="flex flex-col gap-3">
                {pipelineStages.map(stage => (
                    <li key={stage.id}>
                        <button
                            type="button"
                            className={`${styles.stage__btn} ${
                                selectedId === stage.id ? styles.active : ""
                            }`}
                            onClick={onSelect.bind(null, stage.id)}
                        >
                            <Image
                                src={stage.iconUrl}
                                alt="Stage Icon"
                                width={24}
                                height={24}
                                className="w-6 h-auto object-contain mr-2"
                                unoptimized
                            />
                            <span>{stage.stageName}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default PipelineStages;
