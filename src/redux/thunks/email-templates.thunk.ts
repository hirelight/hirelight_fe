import { createAsyncThunk } from "@reduxjs/toolkit";

import emailTemplateServices from "@/services/email-template/email-template.service";

import {
    DELTE_EMAIL_TEMPLATES_BY_ID,
    FETCH_EMAIL_TEMPLATES,
} from "../constants";

export const fetchEmailTemplates = createAsyncThunk(
    FETCH_EMAIL_TEMPLATES,
    async () => {
        const data = await emailTemplateServices.getListAsync();
        return data.data;
    }
);

export const deleteEmailTemplateById = createAsyncThunk(
    DELTE_EMAIL_TEMPLATES_BY_ID,
    async (id: number) => {
        const data = await emailTemplateServices.deleteByIdAsync(id);
        return data.data;
    }
);
