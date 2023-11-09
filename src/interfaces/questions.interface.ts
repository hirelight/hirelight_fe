import { IQuestionTagDto } from "@/services/questions/questions.interface";

export interface CreateQuestionForm {
    content: QuestionAnswerContentJson;
    difficulty: number;
    tagList: IQuestionTagDto[];
}

export interface QuestionAnswerContentJson {
    name: string;
    type: "one-answer" | "multiple-answers" | "essay";
    answers: {
        name: string;
        correct: boolean;
    }[];
    description?: string;
}

export const QuestionDifficulty = ["Easy", "Medium", "Hard", "Advance"];
export const QuestionTypes = new Map<string, string>([
    ["one-answer", "One answer"],
    ["multiple-answers", "Multiple answers"],
    ["essay", "Essay"],
]);
