"use client";

import React, { useState } from "react";

import styles from "./QuestionCard.module.scss";

const answers = [
    "Hyper Text Markup Language",
    "High Tech Modern Language",
    "Hyperlink and Text Markup Language",
    "Hyperlink Text Mode Language",
];

const QuestionCard = () => {
    const [curAnswer, setCurAnswer] = useState(answers[0]);

    return (
        <div className="bg-white p-4 flex items-stretch">
            <div className="flex-1">
                <h3 className="text-neutral-700 font-semibold mb-4">
                    Question 1: HTML is shorthand of?
                </h3>
                <div
                    className={`grid grid-cols-1 md:grid-cols-${
                        answers.length > 4 ? 1 : 2
                    } gap-6`}
                >
                    {answers.map((answer, index) => (
                        <div
                            key={index}
                            className={`${styles.answer__wrapper}`}
                        >
                            <input
                                id={`question1-answer-${answer}`}
                                type="radio"
                                checked={answer === curAnswer}
                                value={answer}
                                name="question1-answer"
                                className={`${styles.answer__input}`}
                                onChange={e => setCurAnswer(e.target.value)}
                            />
                            <label
                                htmlFor={`question1-answer-${answer}`}
                                className={`${styles.answer__label}`}
                            >
                                {answer}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="hidden h-20 w-[1px] mx-6 self-center bg-gray-300 md:block"></div>
            <div className="w-[200px] text-sm text-neutral-500">
                <p className="font-semibold mb-2">
                    Difficulty: <span className="font-normal">Basic</span>
                </p>
                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold mr-2">Tags:</span>
                        {[
                            "Frontend",
                            "NextJs",
                            "CSS",
                            "Javascript/HTML/CSS",
                        ].map((tag, index) => (
                            <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;
