import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { EAppFormOption, IAppFormField, ISetAppFormField } from "@/interfaces";
import { appFormSections } from "@/utils/shared/initialDatas";

interface IAppFormSection {
    title: string;
    fields: IAppFormField[];
}

export interface IAppFormState {
    datas: IAppFormSection[];
}
const initialState: IAppFormState = {
    datas: appFormSections.datas,
};

const appFormSlice = createSlice({
    name: "appForm",
    initialState,
    reducers: {
        setJob: (state, action) => {
            state.datas = action.payload;
        },
        addSection: (state, action) => {
            state.datas = state.datas.concat([action.payload]);
        },

        addField: (state, action) => {
            state.datas = state.datas.map(item => {
                if (
                    item.title.toLowerCase() ===
                    action.payload.title.toLowerCase()
                ) {
                    return {
                        ...item,
                        fields: [...item.fields, action.payload.field],
                    };
                }
                return item;
            });
        },

        removeField: (state, action) => {
            state.datas = state.datas.map(item => {
                if (item.title === action.payload.title) {
                    return {
                        ...item,
                        fields: item.fields.filter(
                            field => field.label === action.payload.field.label
                        ),
                    };
                }
                return item;
            });
        },

        setField: (state, action: PayloadAction<ISetAppFormField>) => {
            const { sectionTitle, label, option } = action.payload;

            state.datas = state.datas.map(item => {
                if (item.title.toLowerCase() === sectionTitle.toLowerCase()) {
                    return {
                        ...item,
                        fields: item.fields.map(field =>
                            field.label === label
                                ? { ...field, selectedOption: option }
                                : field
                        ),
                    };
                }

                return item;
            });
        },

        clearAppForm: (state, action) => {
            state = initialState;
        },
    },
});

export const { setField, clearAppForm, addSection, addField, removeField } =
    appFormSlice.actions;
export default appFormSlice.reducer;
