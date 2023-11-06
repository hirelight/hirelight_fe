import { createAsyncThunk } from "@reduxjs/toolkit";

import jobServices from "@/services/job/job.service";
import { ICreateJobDto } from "@/services/job/job.interface";
import appFormTemplateServices from "@/services/app-form-template/app-form-template.service";
import { IAppFormSection } from "@/interfaces";
import { IAppFormTemplateSection } from "@/interfaces/app-form-template.interface";

import { CREATE_NEW_JOBPOST, GET_JOB_BY_ID } from "../constants/job.contant";

export const createNewJobPost = createAsyncThunk(
    CREATE_NEW_JOBPOST,
    async (createJobPostDto: ICreateJobDto) => {
        const data = await jobServices.createAsync(createJobPostDto);
        return data.data;
    }
);

export const getJobById = createAsyncThunk(
    GET_JOB_BY_ID,
    async (id: number) => {
        const [jobAppFormRes, appFormTemplateRes] = await Promise.all([
            jobServices.getByIdAsync(id),
            appFormTemplateServices.getListAsync(),
        ]);
        const jobAppFormParsed = JSON.parse(jobAppFormRes.data.applicationForm);
        const appFormTemplateParsed = JSON.parse(
            appFormTemplateRes.data[0].content
        );
        const mergeAppForm = mergeAppFormFields(
            jobAppFormParsed,
            appFormTemplateParsed.app_form
        );
        return {
            ...jobAppFormRes.data,
            applicationForm: JSON.stringify(mergeAppForm),
        };
    }
);

const mergeAppFormFields = (
    sourceArr: IAppFormSection[],
    mergeArr: IAppFormTemplateSection[]
) => {
    const myMap = new Map<string, IAppFormSection>();

    sourceArr.forEach(section => {
        myMap.set(section.name.toLowerCase().replace(" ", "_"), section);
    });

    mergeArr.forEach(section => {
        const key = section.name.toLowerCase().replace(" ", "_");
        const isExist = myMap.get(key);
        if (isExist) {
            const fieldMap = new Map();
            section.fields.forEach((mergeField: any) => {
                if (!fieldMap.has(mergeField.id))
                    fieldMap.set(mergeField.id, mergeField);
            });
            isExist.fields.forEach((srcField: any) => {
                if (fieldMap.has(srcField.id))
                    fieldMap.set(srcField.id, srcField);
            });

            myMap.set(key, {
                ...isExist,
                fields: Array.from(fieldMap.values()),
            });
        }
    });

    return Array.from(myMap.values());
};
