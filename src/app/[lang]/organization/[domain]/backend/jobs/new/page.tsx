import React from "react";
import { Metadata } from "next";

import AddJobDetailForm from "./components/AddJobDetailForm";

export const metadata: Metadata = {
    title: "Create new hiring pipeline",
};

const NewJob = (props: any) => {
    return <AddJobDetailForm />;
};

export default NewJob;
