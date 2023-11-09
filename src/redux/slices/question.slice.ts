import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { QuestionAnswerContentJson } from "@/interfaces/questions.interface";
import { IQuestionAnswerDto } from "@/services";

import { fetchQuestionById } from "../thunks/question.thunk";

type QuestionSliceType = {
    isLoading: boolean;
    data: Omit<IQuestionAnswerDto, "content"> & {
        content: QuestionAnswerContentJson;
    };
};

const initialState: QuestionSliceType = {
    data: {
        id: 0,
        updaterId: 0,
        organizationId: 0,
        content: {
            name: "",
            type: "one-answer",
            description: "",
            answers: [],
        },
        difficulty: 0,
        tagList: [],
        createdTime: new Date(),
        updatedTime: new Date(),
        status: "",
    },
    isLoading: false,
};

const questionSlice = createSlice({
    initialState,
    name: "question",
    reducers: {
        setQuestion: (state, action) => {
            state.data = action.payload as any;
        },
        startFetching: state => {},
    },
    extraReducers(builder) {
        builder
            .addCase(fetchQuestionById.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchQuestionById.fulfilled, (state, action) => {
                const { data, message } = action.payload;
                toast.success(message);
                state.data = { ...data, content: JSON.parse(data.content) };
                state.isLoading = false;
            })
            .addCase(fetchQuestionById.rejected, (state, action) => {
                toast.error(action.error.message);
                state.isLoading = false;
            });
    },
});

export const { setQuestion } = questionSlice.actions;

export default questionSlice.reducer;
