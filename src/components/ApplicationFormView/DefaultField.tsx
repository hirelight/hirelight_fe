import React from "react";

import { IAppFormField } from "@/interfaces";

import { CustomInput } from "..";

const DefaultField = ({ field }: { field: IAppFormField }) => {
    switch (field.id) {
        case "name":

        default:
            <CustomInput
                {...field}
                title={field.label}
                type={field.type}
                required={field.required}
                value={field.value}
            />;
    }
};

export default DefaultField;
