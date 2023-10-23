import React from "react";

import QuestionCard from "./QuestionCard";
import Pagination from "./Pagination";

const QuestionList = () => {
    return (
        <div>
            <ul className="flex flex-col gap-2 mb-6">
                {new Array(5).fill("").map((item, index) => (
                    <li key={index}>
                        <QuestionCard />
                    </li>
                ))}
            </ul>
            <Pagination />
        </div>
    );
};

export default QuestionList;
