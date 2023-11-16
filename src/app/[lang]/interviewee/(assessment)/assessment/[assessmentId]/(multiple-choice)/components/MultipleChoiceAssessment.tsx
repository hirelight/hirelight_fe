"use client";

import React from "react";
import Image from "next/image";

import styles from "./MultipleChoiceAssessment.module.scss";

import logo from "/public/images/logo.svg";

import QuestionList from "./QuestionList";

const MultipleChoiceAssessment = () => {
    return (
        <div>
            <div className={styles.banner}>
                <div className="w-40 aspect-square p-6 rounded-full bg-white overflow-hidden drop-shadow-lg">
                    <Image
                        src={logo}
                        alt="Company logo"
                        width={180}
                        height={180}
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>
            <main className="max-w-screen-xl mx-auto p-4 xl:px-6">
                <div className="mb-8">
                    <h3 className="text-2xl text-center font-semibold">
                        Bài kiểm tra đánh giá _______
                    </h3>
                    <p className="text-center text-base text-gray-500 font-medium">
                        Frontend Dev - HireLight
                    </p>
                </div>
                <div>
                    <QuestionList />
                </div>
            </main>
        </div>
    );
};

export default MultipleChoiceAssessment;
