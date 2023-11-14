import { createSlice } from "@reduxjs/toolkit";

interface ICandidatesSlice {
    candidates: any[];
    selectedCandidates: string[];
}

const initialState: ICandidatesSlice = {
    candidates: new Array(3).fill(""),
    selectedCandidates: [],
};

const candidatesSlice = createSlice({
    name: "candidates",
    initialState,
    reducers: {
        setSelectCandidate: (state, action) => {
            const isExisting = state.selectedCandidates.find(
                item => item === action.payload
            );
            console.log(isExisting, action.payload);
            if (isExisting !== undefined) {
                state.selectedCandidates = state.selectedCandidates.filter(
                    item => item !== action.payload
                );
            } else
                state.selectedCandidates = [
                    ...state.selectedCandidates,
                    action.payload,
                ];
        },
        setSelectAllCandidates: state => {
            if (state.selectedCandidates.length === 0)
                state.selectedCandidates = state.candidates.map(
                    (item, index) => item
                );
            else state.selectedCandidates = [];
        },
    },
});

export const { setSelectAllCandidates, setSelectCandidate } =
    candidatesSlice.actions;
export default candidatesSlice.reducer;
