import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import moment from "moment";

import {
    ApplicationFormJSON,
    ICreateJobDto,
    IJobDetailError,
    IJobDto,
    JobContentJson,
} from "@/services/job/job.interface";
import {
    IAddAppFormField,
    IAppFormField,
    IAppFormSection,
    ICustomField,
    IDelteCustomField,
    IEditAppFormField,
} from "@/interfaces";

import { createNewJobPost, getJobById, updateJob } from "../thunks/job.thunk";

export interface IJobSliceInitialState {
    data: Omit<IJobDto, "content" | "applicationForm"> & {
        content: JobContentJson;
        applicationForm: ApplicationFormJSON;
    };
    contentLength: {
        description: number;
        requirements: number;
        benefits: number;
    };
    loading: boolean;
    error: {
        titleErr: string;
        areaArr: string;
        contentErr: {
            descriptionErr: string;
            requirementsErr: string;
            benefitsErr: string;
            contentErr: string;
        };
        salaryErr: string;
        jobPublishTimeErr: string;
    };
}

const initialState: IJobSliceInitialState = {
    data: {
        id: "",
        creatorId: "",
        assessmentFlowId: null,
        organizationId: "",
        title: "",
        content: {
            description: "",
            requirements: "",
            benefits: "",
        },
        applicationForm: {
            form_structure: [],
            questions: [],
        },
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
    contentLength: {
        description: 0,
        requirements: 0,
        benefits: 0,
    },
    error: {
        titleErr: "",
        areaArr: "",
        contentErr: {
            descriptionErr: "",
            requirementsErr: "",
            benefitsErr: "",
            contentErr: "",
        },
        salaryErr: "",
        jobPublishTimeErr: "",
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
                titleErr: "",
                areaArr: "",
                contentErr: {
                    descriptionErr: "",
                    requirementsErr: "",
                    benefitsErr: "",
                    contentErr: "",
                },
                salaryErr: "",
                jobPublishTimeErr: "",
            };
        },
        setContentLength: (state, action) => {
            state.contentLength = action.payload;
        },

        setAppForm: (state, action) => {
            state.data.applicationForm = action.payload;
        },

        // *************App form field*************************
        editAppFormField: (state, action: PayloadAction<IEditAppFormField>) => {
            // state.data.applicationForm.form_structure =
            //     state.data.applicationForm.form_structure.map(section => {
            //         if (section.id === action.payload.sectionId) {
            //             return {
            //                 ...section,
            //                 fields: section.fields.map(item => {
            //                     if (
            //                         item.custom &&
            //                         (item as ICustomField).id ===
            //                             action.payload.field.id
            //                     )
            //                         return action.payload.field as any;

            //                     return item;
            //                 }),
            //             };
            //         }

            //         return section;
            //     });

            state.data.applicationForm.form_structure =
                state.data.applicationForm.form_structure.map(section => {
                    if (section.id === action.payload.sectionId) {
                        return {
                            ...section,
                            fields: section.fields.map(field => {
                                if (field.id === action.payload.field.id) {
                                    return action.payload.field as any;
                                }

                                return field;
                            }),
                        };
                    }

                    return section;
                });
        },

        deleteCustomField: (state, action: PayloadAction<string>) => {
            state.data.applicationForm.questions =
                state.data.applicationForm.questions.filter(
                    field => field.id !== action.payload
                );
        },

        // *************App custom field*************************
        addCustomField: (state, action: PayloadAction<IAppFormField>) => {
            state.data.applicationForm.questions =
                state.data.applicationForm.questions.concat([
                    action.payload as any,
                ]);
        },
        editCustomField: (state, action: PayloadAction<IAppFormField>) => {
            state.data.applicationForm.questions =
                state.data.applicationForm.questions.map(field => {
                    if (field.id === action.payload.id)
                        return action.payload as any;
                    return field;
                });
        },
        resetJobSliceState: state => {
            state = initialState as any;
        },
    },

    extraReducers: builder => {
        builder
            .addCase(createNewJobPost.pending, () => {})
            .addCase(createNewJobPost.fulfilled, (state, action) => {})
            .addCase(createNewJobPost.rejected, (state, action) => {});

        builder
            .addCase(updateJob.pending, state => {
                state.loading = true;
            })
            .addCase(updateJob.fulfilled, (state, action) => {
                const { data, message } = action.payload;
                state.data = {
                    ...data,
                    startTime: moment.utc(data.startTime).local().toDate(),
                    endTime: moment.utc(data.endTime).local().toDate(),
                    content: JSON.parse(data.content),
                    applicationForm: JSON.parse(data.applicationForm),
                } as typeof state.data;
                state.loading = false;
                toast.success(message, {
                    position: "bottom-right",
                    autoClose: 1000,
                });
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
                    startTime: moment
                        .utc(action.payload.startTime)
                        .local()
                        .toDate(),
                    endTime: moment
                        .utc(action.payload.endTime)
                        .local()
                        .toDate(),
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
    editAppFormField,
    deleteCustomField,
    editCustomField,
    setContentLength,
    addCustomField,
    deleteJob,
} = jobSlice.actions;
export default jobSlice.reducer;
