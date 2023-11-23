import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./slices/auth.slice";
import jobReducer from "./slices/job.slice";
import questionKitsReducer from "./slices/question-kits.slice";
import candidatesReducer from "./slices/candidates.slice";
import templatesReducer from "./slices/templates.slice";
import appFormTemplateReducer from "./slices/app-form-template.slice";
import assessmentFlowTemplatesReducer from "./slices/assessment-flow-templates.slice";
import questionReducer from "./slices/question.slice";
import assessmentFlowReducer from "./slices/assessment-flow.slice";
import applicantProfileReducer from "./slices/applicant-profile.slice";
import assessmentReducer from "./slices/assessment.slice";
import assessmentProfilesReducer from "./slices/assessment-profiles.slice";
import applicantAssessmentDetailReducer from "./slices/applicant-assessment-detail.slice";

const rootReducer = combineReducers({
    auth: authReducer,
    job: jobReducer,
    question: questionReducer,
    questionKits: questionKitsReducer,
    candidates: candidatesReducer,
    templates: templatesReducer,
    assessment: assessmentReducer,
    assessmentProfiles: assessmentProfilesReducer,
    assessmentFlow: assessmentFlowReducer,
    appFormTemplate: appFormTemplateReducer,
    applicantProfile: applicantProfileReducer,
    applicantAssessmentDetail: applicantAssessmentDetailReducer,
    assessmentFlowTemplates: assessmentFlowTemplatesReducer,
});

export default rootReducer;
