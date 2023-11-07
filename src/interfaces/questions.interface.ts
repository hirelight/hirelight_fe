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

export const QuestionDifficulty = ["Easy", "Medium", "Hard", "Advance"];
export const QuestionTypes = new Map<string, string>([
    ["one-answer", "One answer"],
    ["multiple-answers", "Multiple answers"],
]);
