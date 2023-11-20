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
        isChosen?: boolean;
    }[];
    config?: {
        thinkTime: number;
        numOfTakes: number;
        duration: number;
    };
    video?: {
        url: string;
        fileName: string;
    };
    description?: string;
}

export interface ICandidateMCContentJson {
    name: string;
    type: "one-answer" | "multiple-answers" | "essay";
    answers: {
        name: string;
        isChosen: boolean;
    }[];
    config?: {
        thinkTime: number;
        numOfTakes: number;
        duration: number;
    };
    description?: string;
}

export interface ICandidateMCDto {
    id: string;
    updaterId: string;
    organizationId: string;
    content: string;
    difficulty: number;
    tagList: IQuestionTagDto[];
    createdTime: Date;
    updatedTime: Date;
    status: string;
}

export const QuestionDifficulty = ["Easy", "Medium", "Hard", "Advance"];
export const QuestionTypes = new Map<string, string>([
    ["one-answer", "One answer"],
    ["multiple-answers", "Multiple answers"],
    ["essay", "Essay"],
]);
