import { createAsyncThunk } from "@reduxjs/toolkit";

import jobServices from "@/services/job/job.service";
import { ICreateJobDto } from "@/services/job/job.interface";

import { CREATE_NEW_JOBPOST } from "../constants/job.contant";

export const createNewJobPost = createAsyncThunk(
    CREATE_NEW_JOBPOST,
    async (createJobPostDto: ICreateJobDto) => {
        const data = await jobServices.createAsync(createJobPostDto);
        return data.data;
    }
);
