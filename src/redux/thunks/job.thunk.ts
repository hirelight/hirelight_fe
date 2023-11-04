import { createAsyncThunk } from "@reduxjs/toolkit";

import jobServices from "@/services/job/job.service";
import { ICreateJobDto } from "@/services/job/job.interface";

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
        const data = await jobServices.getByIdAsync(id);
        return data.data;
    }
);
