import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IEmailTemplatesDto } from "@/services/email-template/email-template.interface";

import {
    deleteEmailTemplateById,
    fetchEmailTemplates,
} from "../thunks/email-templates.thunk";

interface ITemplatesSlice {
    emailTemplates: {
        isAdding: boolean;
        editingId: number;
        searchQuery: string;
        datas: IEmailTemplatesDto[];
        loading: boolean;
    };
}

const initialState: ITemplatesSlice = {
    emailTemplates: {
        isAdding: false,
        editingId: -1,
        searchQuery: "",
        datas: [],
        loading: false,
    },
};

const templatesSlice = createSlice({
    name: "templates",
    initialState,
    reducers: {
        setIsAdding: (state, action: PayloadAction<boolean>) => {
            state.emailTemplates.isAdding = action.payload;
        },
        setEditingId: (state, action: PayloadAction<number>) => {
            state.emailTemplates.editingId = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.emailTemplates.searchQuery = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchEmailTemplates.pending, state => {
                state.emailTemplates.loading = true;
            })
            .addCase(fetchEmailTemplates.fulfilled, (state, action) => {
                state.emailTemplates.datas = action.payload;
                state.emailTemplates.loading = false;
            })
            .addCase(fetchEmailTemplates.rejected, (state, action) => {
                state.emailTemplates.loading = false;
            });

        builder
            .addCase(deleteEmailTemplateById.pending, state => {
                state.emailTemplates.loading = true;
            })
            .addCase(deleteEmailTemplateById.fulfilled, (state, action) => {
                state.emailTemplates.loading = false;
            })
            .addCase(deleteEmailTemplateById.rejected, (state, action) => {
                state.emailTemplates.loading = false;
            });
    },
});

export const { setEditingId, setSearchQuery, setIsAdding } =
    templatesSlice.actions;

export default templatesSlice.reducer;
