import React from "react";
import { Metadata } from "next";

import AddJobDetailForm from "./components/AddJobDetailForm";

export const metadata: Metadata = {
    title: "Create new recruitment process",
};

const NewJob = (props: any) => {
    return <AddJobDetailForm />;
};

export default NewJob;
