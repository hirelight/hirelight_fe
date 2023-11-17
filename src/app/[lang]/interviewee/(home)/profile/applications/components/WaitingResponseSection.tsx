import React from "react";

import ApplicationCard from "./ApplicationCard";

const WaitingResponseSection = () => {
    return (
        <ul className="space-y-4">
            {new Array(8).fill("").map((item, index) => (
                <li key={index}>{/* <ApplicationCard /> */}</li>
            ))}
        </ul>
    );
};

export default WaitingResponseSection;
