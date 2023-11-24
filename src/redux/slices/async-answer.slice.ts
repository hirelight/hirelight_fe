import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    answerPos: 0,
    remainingThinkingTime: 0,
    remainingRecordingTime: 0,
    isRecording: false,
    attempts: 0,
};

const asyncAnswer = createSlice({
    initialState,
    name: "asyncAnswer",
    reducers: {
        setAnswerState: (state, action) => {
            return action.payload;
        },
    },
});

export const { setAnswerState } = asyncAnswer.actions;
export default asyncAnswer.reducer;
