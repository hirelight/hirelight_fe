"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { Button, CustomInput, Modal, Portal } from "@/components";
import questionAnswerServices from "@/services/questions/questions.service";
import { IQuestionAnswerDto } from "@/services";
import questionAnsSetServices from "@/services/question-sets/question-sets.service";

import QuestionPicker from "../components/QuestionPicker";
import QuestionCard from "../components/QuestionPicker/QuestionCard";
import QuestionSetForm from "../components/QuestionSetForm";

type CreateQuestionSetPageProps = {};

const CreateQuestionSetPage: React.FC<CreateQuestionSetPageProps> = ({}) => {
    return (
        <div className="w-full bg-white rounded-md shadow-md p-4 xl:px-6">
            <QuestionSetForm />
        </div>
    );
};

export default CreateQuestionSetPage;
