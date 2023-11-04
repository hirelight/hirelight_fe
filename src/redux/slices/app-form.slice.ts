import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { appFormSections } from "@/utils/shared/initialDatas";
import { IAppFormSection } from "@/interfaces";

export interface IAppFormState {
    datas: IAppFormSection[];
}
const initialState: IAppFormState = {
    datas: appFormSections as IAppFormSection[],
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
            state.datas ===
                state.datas.map(item => {
                    if (item.name === action.payload.sectionName) {
                        return {
                            ...item,
                            fields: item.fields.concat([action.payload]),
                        };
                    }
                    return item;
                });
        },

        removeField: (state, action) => {
            state.datas = state.datas.map(item => {
                if (item.name === action.payload.title) {
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

        setField: (state, action) => {
            const { field, sectionName } = action.payload;

            state.datas = state.datas.map(item => {
                if (item.name === sectionName) {
                    return {
                        ...item,
                        fields: item.fields.map(itemField =>
                            itemField.label === field.label ? field : itemField
                        ),
                    };
                }

                return item;
            });
        },
    },
});

export const { setField, addSection, addField, removeField } =
    appFormSlice.actions;
export default appFormSlice.reducer;
