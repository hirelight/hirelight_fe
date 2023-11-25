import { Metadata } from "next";
import React from "react";

import ReviewMediation from "./components/ReviewMediation";

export const metadata: Metadata = {
    title: "Review Assessment Answer",
};

const ReviewPage = async () => {
    return <ReviewMediation />;
};

export default ReviewPage;
