import { ISetJob, IJob, IJobSlice } from '@/interfaces/job.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IJobSliceInitialState {
  data: IJobSlice;
  loading: boolean;
}

const initialState: IJobSliceInitialState = {
  data: {
    title: '',
    location: '',
    description: {
      description: '',
      requirements: '',
      benefits: '',
    },
    annualSalary: {
      from: '',
      to: '',
    },
  },
  loading: false,
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setJob: (state, action: PayloadAction<ISetJob>) => {
      state.data = action.payload;
    },
    deleteJob: (state, action) => {},
  },
});

export const { setJob } = jobSlice.actions;
export default jobSlice.reducer;
