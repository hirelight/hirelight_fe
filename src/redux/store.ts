import jobReducer from "./slices/job.slice";
import appFormReducer from "./slices/app-form.slice";
import questionKitsReducer from "./slices/question-kits.slice";
import candidatesReducer from "./slices/candidates.slice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        job: jobReducer,
        appForm: appFormReducer,
        questionKits: questionKitsReducer,
        candidates: candidatesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
