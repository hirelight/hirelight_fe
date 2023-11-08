import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
    IEmailTemplateTypeDto,
    IEmailTemplatesDto,
} from "@/services/email-template/email-template.interface";

import {
    deleteEmailTemplateById,
    editEmailTemplate,
    fetchEmailTemplateTypes,
    fetchEmailTemplates,
} from "../thunks/email-templates.thunk";

interface ITemplatesSlice {
    emailTemplates: {
        isAdding: boolean;
        editingId: number;
        searchQuery: string;
        datas: IEmailTemplatesDto[];
        loading: boolean;
        emailTemplateTypes: IEmailTemplateTypeDto[];
    };
}

const initialState: ITemplatesSlice = {
    emailTemplates: {
        isAdding: false,
        editingId: -1,
        searchQuery: "",
        datas: [],
        loading: false,
        emailTemplateTypes: [],
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
            .addCase(fetchEmailTemplateTypes.pending, state => {
                state.emailTemplates.loading = true;
            })
            .addCase(
                fetchEmailTemplateTypes.fulfilled,
                (state, action: PayloadAction<IEmailTemplateTypeDto[]>) => {
                    state.emailTemplates.emailTemplateTypes = action.payload;
                    state.emailTemplates.loading = false;
                }
            )
            .addCase(fetchEmailTemplateTypes.rejected, (state, action) => {
                state.emailTemplates.loading = false;
            });

        builder
            .addCase(editEmailTemplate.pending, state => {
                state.emailTemplates.loading = true;
            })
            .addCase(editEmailTemplate.fulfilled, (state, action) => {
                state.emailTemplates.loading = false;
                toast.success("Edit email success!");
            })
            .addCase(editEmailTemplate.rejected, (state, action) => {
                state.emailTemplates.loading = false;
                toast.error("Edit email failure!");
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
