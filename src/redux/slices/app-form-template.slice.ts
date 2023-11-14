import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
    IAddNewField,
    IAppFormTemplate,
    IAppFormTemplateProfileSection,
    IDeleteField,
    IEditField,
} from "@/interfaces/app-form-template.interface";
import { IAppFormTemplateDto } from "@/services/app-form-template/app-form-template.interface";

interface IAppFormTemplateState {
    data: Omit<IAppFormTemplateDto, "content"> & { content: IAppFormTemplate };
}

const initialState: IAppFormTemplateState = {
    data: {
        id: "",
        name: "",
        content: {
            app_form: [],
            profile: [],
        },
        organizationId: "",
        createdTime: new Date(),
        updatedTime: new Date(),
        updaterId: "",
    },
};

const appFormTemplateSlice = createSlice({
    name: "appFormTemplate",
    initialState,
    reducers: {
        setAppFormTemplate: (state, action) => {
            state.data = action.payload;
        },

        setAppFormSections: (state, action) => {
            return {
                ...state,
                data: {
                    ...state.data,
                    content: {
                        ...state.data.content,
                        app_form: action.payload,
                    },
                },
            };
        },

        setProfileSections: (state, action) => {
            return {
                ...state,
                data: {
                    ...state.data,
                    content: {
                        ...state.data.content,
                        profile: action.payload,
                    },
                },
            };
        },

        addProfileSection: (
            state,
            action: PayloadAction<IAppFormTemplateProfileSection>
        ) => {
            state.data.content.profile = state.data.content.profile.concat([
                action.payload as any,
            ]);
        },

        addNewField: (state, action: PayloadAction<IAddNewField>) => {
            const { appFormSectionId, profileSectionId, newField }: any =
                action.payload;
            state.data.content.profile = state.data.content.profile.map(
                section => {
                    if (section.id === profileSectionId) {
                        return {
                            ...section,

                            fields: section.fields.concat([newField]),
                        };
                    }

                    return section;
                }
            );
            state.data.content.app_form = state.data.content.app_form.map(
                section => {
                    if (section === appFormSectionId) {
                        return {
                            ...section,
                            fields: section.fields.concat([newField]),
                        };
                    }

                    return section;
                }
            );
        },

        editField: (state, action: PayloadAction<IEditField>) => {
            const { appFormSectionId, profileSectionId, updatedField }: any =
                action.payload;
            state.data.content.profile = state.data.content.profile.map(
                section => {
                    if (section.id === profileSectionId) {
                        return {
                            ...section,

                            fields: section.fields.map(field =>
                                field.id === updatedField.id
                                    ? updatedField
                                    : field
                            ),
                        };
                    }

                    return section;
                }
            );
            state.data.content.app_form = state.data.content.app_form.map(
                section => {
                    if (section === appFormSectionId) {
                        return {
                            ...section,
                            fields: section.fields.map(field =>
                                field.id === updatedField.id
                                    ? updatedField
                                    : field
                            ),
                        };
                    }

                    return section;
                }
            );
        },

        deleteField: (state, action: PayloadAction<IDeleteField>) => {
            const { appFormSectionId, fieldId, profileSectionId } =
                action.payload;
            const updatedProfile = state.data.content.profile.filter(
                section => {
                    if (section.id === profileSectionId)
                        return {
                            ...section,
                            fields: section.fields.filter(
                                field => field.id !== fieldId
                            ),
                        };

                    return section;
                }
            );

            const updatedAppForm = state.data.content.app_form.filter(
                section => {
                    if (section.id === appFormSectionId)
                        return {
                            ...section,
                            fields: section.fields.filter(
                                field => field.id !== fieldId
                            ),
                        };

                    return section;
                }
            );

            return {
                ...state,
                data: {
                    ...state.data,
                    content: {
                        app_form: updatedAppForm,
                        profile: updatedProfile,
                    },
                },
            };
        },

        deleteProfileSection: (state, action: PayloadAction<string>) => {
            state.data.content.profile = state.data.content.profile.filter(
                section => section.id !== action.payload
            );
        },
    },
});

export const {
    addProfileSection,
    addNewField,
    editField,
    deleteField,
    deleteProfileSection,
    setAppFormTemplate,
    setAppFormSections,
    setProfileSections,
} = appFormTemplateSlice.actions;
export default appFormTemplateSlice.reducer;
