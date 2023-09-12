import { ISetJob, IJob, IJobSlice } from '@/interfaces/job.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAppFormState {
  data: IJobSlice;
  loading: boolean;
}

const initialState: IAppFormState = {
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

const appFormSlice = createSlice({
  name: 'appForm',
  initialState,
  reducers: {
    setJob: (state, action: PayloadAction<ISetJob>) => {
      state.data = action.payload;
    },
  },
});

export const { setJob } = appFormSlice.actions;
export default appFormSlice.reducer;
