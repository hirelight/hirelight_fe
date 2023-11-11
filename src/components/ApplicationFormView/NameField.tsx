import React, { useState } from "react";

import { IAppFormField } from "@/interfaces";

import { CustomInput } from "..";

const NameField = ({ field }: { field: IAppFormField }) => {
    const [firstName, setFirstName] = useState(
        field.value ? (field.value as string).split(" ")[0] : ""
    );
    const [lastName, setLastName] = useState(
        field.value ? (field.value as string).split(" ")[1] : ""
    );
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <CustomInput
                {...field}
                id="first_name"
                title={"First name"}
                type={field.type}
                required={field.required}
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
            />
            <CustomInput
                {...field}
                id="last_name"
                title={"Last name"}
                type={field.type}
                required={field.required}
                value={lastName}
                onChange={e => setLastName(e.target.value)}
            />
        </div>
    );
};

export default NameField;
