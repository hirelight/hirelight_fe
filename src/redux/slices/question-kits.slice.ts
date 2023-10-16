import { createSlice } from "@reduxjs/toolkit";

import { IKit } from "@/interfaces/question-kits.interface";

interface IQuestionKitsSlice {
    datas: IKit[];
    loading: boolean;
}

const initialState: IQuestionKitsSlice = {
    datas: [],
    loading: false,
};

const questionKitsSlice = createSlice({
    name: "questionKits",
    initialState,
    reducers: {
        addKit: (state, action) => {
            state.datas = [...state.datas, action.payload];
        },

        updateKit: (state, action) => {
            state.datas = state.datas.map(item => {
                if (item === action.payload.id) {
                    return action.payload;
                }

                return item;
            });
        },

        addKitContent: (state, action) => {
            state.datas = state.datas.map(item => {
                if (item === action.payload.kitId) {
                    return { ...item, contents: action.payload };
                }

                return item;
            });
        },

        updateKitContent: (state, action) => {
            state.datas = state.datas.map(item => {
                if (item.id === action.payload.kitId) {
                    return {
                        ...item,
                        contents: item.contents.map(content => {
                            if (content.name === action.payload.content.name) {
                                return action.payload.content;
                            }
                            return content;
                        }),
                    };
                }

                return item;
            });
        },
    },
});

export const { addKit, updateKit, addKitContent, updateKitContent } =
    questionKitsSlice.actions;
export default questionKitsSlice.reducer;
