import { createAsyncThunk } from "@reduxjs/toolkit";

import assessmentFlowTemplatesServices from "@/services/assessment-flow-templates/assessment-flow-templates.service";
import { ICreateAssessmentFlTempDto } from "@/services/assessment-flow-templates/assessment-flow-templates.interface";

import {
    CREATE_ASSESSMENT_FLOW_TEMPLATE,
    FETCH_FLOW_TEMPLATES,
} from "../constants/assessment-flow-templates.constant";

export const fetchAssessmentFlowTemplates = createAsyncThunk(
    FETCH_FLOW_TEMPLATES,
    async () => {
        const data = await assessmentFlowTemplatesServices.getListAsync();
        return data;
    }
);

export const createAssessmentFlowTemplates = createAsyncThunk(
    CREATE_ASSESSMENT_FLOW_TEMPLATE,
    async (createDto: ICreateAssessmentFlTempDto) => {
        const data =
            await assessmentFlowTemplatesServices.createASync(createDto);
        return data;
    }
);
