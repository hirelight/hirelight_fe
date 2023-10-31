import React from "react";

import { IQuestionAnswerDto } from "@/services/questions/questions.interface";

import QuestionCard from "./QuestionCard";
import Pagination from "./Pagination";

type QuestionListProps = {
    datas: IQuestionAnswerDto[];
};

const QuestionList: React.FC<QuestionListProps> = ({ datas }) => {
    return (
        <div>
            <ul className="flex flex-col gap-2 mb-6">
                {datas?.map((item, index) => (
                    <li key={item.id}>
                        <QuestionCard data={item} index={index} />
                    </li>
                ))}
            </ul>
            <Pagination />
        </div>
    );
};

export default QuestionList;
