import { createAsyncThunk } from "@reduxjs/toolkit";

import emailTemplateServices from "@/services/email-template/email-template.service";
import { IEditEmailTemplatesDto } from "@/services/email-template/email-template.interface";

import {
    DELTE_EMAIL_TEMPLATES_BY_ID,
    EDIT_EMAIL_TEMPLATE,
    FETCH_EMAIL_TEMPLATES,
    FETCH_EMAIL_TEMPLATE_TYPES,
} from "../constants";

export const fetchEmailTemplates = createAsyncThunk(
    FETCH_EMAIL_TEMPLATES,
    async () => {
        const data = await emailTemplateServices.getListAsync();
        return data.data;
    }
);

export const fetchEmailTemplateTypes = createAsyncThunk(
    FETCH_EMAIL_TEMPLATE_TYPES,
    async () => {
        const data =
            await emailTemplateServices.getEmailTemplateTypesListAsync();
        return data.data;
    }
);

export const editEmailTemplate = createAsyncThunk(
    EDIT_EMAIL_TEMPLATE,
    async (editDto: IEditEmailTemplatesDto) => {
        const data = await emailTemplateServices.editAsync(editDto);
        return data;
    }
);

export const deleteEmailTemplateById = createAsyncThunk(
    DELTE_EMAIL_TEMPLATES_BY_ID,
    async (id: number) => {
        const data = await emailTemplateServices.deleteByIdAsync(id);
        return data.data;
    }
);
