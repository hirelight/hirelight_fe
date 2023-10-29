import { LazyMotion, Reorder, domMax, motion } from "framer-motion";
import React from "react";

import FieldCard from "./FieldCard";

type FieldListProps = {
    datas: any[];
    reorderFields: (newOrder: any) => void;
};

const FieldList: React.FC<FieldListProps> = ({ datas, reorderFields }) => {
    return (
        <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
        >
            <Reorder.Group axis="y" values={datas} onReorder={reorderFields}>
                {datas?.map((field: any) => (
                    <FieldCard key={field.id} data={field} />
                ))}
            </Reorder.Group>
        </motion.div>
    );
};

export default FieldList;
