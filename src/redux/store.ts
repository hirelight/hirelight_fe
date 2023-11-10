import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth.slice";
import jobReducer from "./slices/job.slice";
import questionKitsReducer from "./slices/question-kits.slice";
import candidatesReducer from "./slices/candidates.slice";
import templatesReducer from "./slices/templates.slice";
import appFormTemplateReducer from "./slices/app-form-template.slice";
import assessmentFlowTemplatesReducer from "./slices/assessment-flow-templates.slice";
import questionReducer from "./slices/question.slice";
import assessmentFlowReducer from "./slices/assessment-flow.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        job: jobReducer,
        question: questionReducer,
        questionKits: questionKitsReducer,
        candidates: candidatesReducer,
        templates: templatesReducer,
        assessmentFlow: assessmentFlowReducer,
        appFormTemplate: appFormTemplateReducer,
        assessmentFlowTemplates: assessmentFlowTemplatesReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
