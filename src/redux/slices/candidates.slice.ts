import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { IJobPostAppAssDetailDto, IJobPostProfileDto } from "@/services";

import {
    getAllAppDetailList,
    getAssessmentAppAssessDetails,
} from "../thunks/applicant-assessment-detail.slice.thunk";

interface ICandidatesSlice {
    candidates: IJobPostAppAssDetailDto[];
    selectedCandidates: string[];
    isLoading: boolean;
}

const initialState: ICandidatesSlice = {
    candidates: [],
    selectedCandidates: [],
    isLoading: false,
};

const candidatesSlice = createSlice({
    name: "candidates",
    initialState,
    reducers: {
        setCandidates: (state, action) => {
            state.candidates = action.payload;
        },

        setSelectCandidate: (state, action) => {
            const isExisting = state.selectedCandidates.find(
                item => item === action.payload
            );

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
                    item => item.id
                );
            else state.selectedCandidates = [];
        },
    },

    extraReducers(builder) {
        builder
            .addCase(getAllAppDetailList.pending, state => {
                state.isLoading = true;
            })
            .addCase(getAllAppDetailList.fulfilled, (state, action) => {
                state.candidates = action.payload.data;
                toast.success(action.payload.message);
                state.isLoading = true;
            })
            .addCase(getAllAppDetailList.rejected, (state, action) => {
                toast.error(action.error.message);
                state.isLoading = true;
            });

        builder
            .addCase(getAssessmentAppAssessDetails.pending, state => {
                state.isLoading = true;
            })
            .addCase(
                getAssessmentAppAssessDetails.fulfilled,
                (state, action) => {
                    state.candidates = action.payload.data;
                    toast.success(action.payload.message);
                    state.isLoading = true;
                }
            )
            .addCase(
                getAssessmentAppAssessDetails.rejected,
                (state, action) => {
                    toast.error(action.error.message);
                    state.isLoading = true;
                }
            );
    },
});

export const { setSelectAllCandidates, setSelectCandidate, setCandidates } =
    candidatesSlice.actions;
export default candidatesSlice.reducer;
