import { createAsyncThunk } from "@reduxjs/toolkit";

import questionAnswerServices from "@/services/questions/questions.service";

export const fetchQuestionById = createAsyncThunk(
    "question/get-by-id",
    async (id: string) => {
        const res = await questionAnswerServices.getByIdAsync(id);

        return res;
    }
);
