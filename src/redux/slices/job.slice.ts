import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
    ICreateJobDto,
    IJobDetailError,
    IJobDto,
    JobContentJson,
} from "@/services/job/job.interface";
import { IAddAppFormField, IAppFormSection } from "@/interfaces";

import { createNewJobPost, getJobById, updateJob } from "../thunks/job.thunk";

export interface IJobSliceInitialState {
    data: Omit<IJobDto, "content" | "applicationForm"> & {
        content: JobContentJson;
        applicationForm: IAppFormSection[];
    };
    loading: boolean;
    error: {
        status: boolean;
        content: IJobDetailError;
    };
}

const initialState: IJobSliceInitialState = {
    data: {
        id: 0,
        creatorId: 0,
        assessmentFlowId: null,
        organizationId: 0,
        title: "",
        content: {
            description: "",
            requirements: "",
            benefits: "",
        },
        applicationForm: [],
        minSalary: 0,
        maxSalary: 0,
        currency: "",
        startTime: new Date(),
        endTime: new Date(),
        area: "",
        experience: "",
        workModality: "",
        employmentType: "",
        keywords: "",
        createdTime: new Date(),
        updatedTime: new Date(),
        status: "",
    },
    error: {
        status: false,
        content: {
            titleErr: "",
            locationErr: "",
            contentErr: {
                descriptionErr: "",
                requirementsErr: "",
                benefitsErr: "",
            },
        },
    },
    loading: false,
};

const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        setJob: (state, action) => {
            state.data = action.payload;
        },
        deleteJob: (state, action) => {},
        setJobError: (state, action) => {
            state.error = action.payload;
        },
        resetJobError: (state, action) => {
            state.error = {
                status: false,
                content: {
                    titleErr: "",
                    locationErr: "",
                    contentErr: {
                        descriptionErr: "",
                        requirementsErr: "",
                        benefitsErr: "",
                    },
                },
            };
        },

        setAppForm: (state, action) => {
            state.data.applicationForm = action.payload;
        },

        addAppFormField: (state, action: PayloadAction<IAddAppFormField>) => {
            state.data.applicationForm = state.data.applicationForm.map(
                section => {
                    if (section.name === action.payload.sectionName) {
                        return {
                            ...section,
                            fields: section.fields.concat([
                                action.payload.field,
                            ]),
                        };
                    }

                    return section;
                }
            );
        },

        resetJobSliceState: state => {
            return initialState;
        },
    },

    extraReducers: builder => {
        builder
            .addCase(createNewJobPost.pending, () => {})
            .addCase(createNewJobPost.fulfilled, (state, action) => {
                console.log(action.payload);
            })
            .addCase(createNewJobPost.rejected, (state, action) => {});

        builder
            .addCase(updateJob.pending, state => {
                state.loading = true;
            })
            .addCase(updateJob.fulfilled, (state, action) => {
                const { data, message } = action.payload;
                state.data = {
                    ...data,
                    content: JSON.parse(data.content),
                    applicationForm: JSON.parse(data.applicationForm),
                } as typeof state.data;
                state.loading = false;
                toast.success(message);
            })
            .addCase(updateJob.rejected, state => {
                state.loading = false;
            });

        builder
            .addCase(getJobById.pending, state => {
                state.loading = true;
            })
            .addCase(getJobById.fulfilled, (state, action) => {
                state.data = {
                    ...action.payload,
                    content: JSON.parse(action.payload.content),
                    applicationForm: JSON.parse(action.payload.applicationForm),
                };
                state.loading = false;
            })
            .addCase(getJobById.rejected, state => {
                state.loading = false;
            });
    },
});

export const {
    setJob,
    resetJobError,
    setJobError,
    resetJobSliceState,
    setAppForm,
    addAppFormField,
} = jobSlice.actions;
export default jobSlice.reducer;
