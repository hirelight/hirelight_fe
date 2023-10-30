import { IQuestionTagDto } from "@/services/questions/questions.interface";

export interface CreateQuestionForm {
    content: QuestionAnswerContentJson;
    difficulty: number;
    tagList: IQuestionTagDto[];
}

export interface QuestionAnswerContentJson {
    name: string;
    type: "one-answer" | "multiple-answers";
    answers: {
        name: string;
        correct: boolean;
    }[];
}
