import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ITemplatesSlice {
    emailTemplates: {
        isAdding: boolean;
        editingId: number;
        searchQuery: string;
    };
}

const initialState: ITemplatesSlice = {
    emailTemplates: {
        isAdding: false,
        editingId: -1,
        searchQuery: "",
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
});

export const { setEditingId, setSearchQuery, setIsAdding } =
    templatesSlice.actions;

export default templatesSlice.reducer;
