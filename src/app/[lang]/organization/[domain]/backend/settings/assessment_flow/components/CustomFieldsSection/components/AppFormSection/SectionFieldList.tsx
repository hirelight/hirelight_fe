import { Reorder, motion } from "framer-motion";
import React from "react";

import { IAppFormField } from "@/interfaces";

import SectionFieldCard from "./SectionFieldCard";

const unOrderList = ["Name", "Email", "Headline"];

type SectionFieldListProps = {
    datas: (IAppFormField & { custom: boolean })[];
    reorderFields: (newOrder: any[]) => void;
};

const SectionFieldList: React.FC<SectionFieldListProps> = ({
    datas,
    reorderFields,
}) => {
    return (
        <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
        >
            <Reorder.Group
                axis="y"
                values={datas.filter(item => !unOrderList.includes(item.label))}
                onReorder={reorderFields}
            >
                {datas?.map((field: any) => (
                    <SectionFieldCard key={field.id} data={field} />
                ))}
            </Reorder.Group>
        </motion.div>
    );
};

export default SectionFieldList;
