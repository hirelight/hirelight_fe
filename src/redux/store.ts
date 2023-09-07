import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './slices/job.slice';

export const store = configureStore({
  reducer: {
    job: jobReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
