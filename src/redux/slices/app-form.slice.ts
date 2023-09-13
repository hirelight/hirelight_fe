import { EAppFormOption, IAppFormField, ISetAppFormField } from '@/interfaces';
import { appFormSections } from '@/utils/shared/initialDatas';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAppFormSection {
  title: string;
  fields: IAppFormField[];
}

export interface IAppFormState {
  datas: IAppFormSection[];
}
const initialState: IAppFormState = {
  datas: appFormSections.datas,
};

const appFormSlice = createSlice({
  name: 'appForm',
  initialState,
  reducers: {
    setJob: (state, action) => {
      state.datas = action.payload;
    },

    setField: (state, action: PayloadAction<ISetAppFormField>) => {
      const { sectionTitle, label, option } = action.payload;

      state.datas = state.datas.map((item) => {
        if (item.title.toLowerCase() === sectionTitle.toLowerCase()) {
          return {
            ...item,
            fields: item.fields.map((field) =>
              field.label === label
                ? { ...field, selectedOption: option }
                : field
            ),
          };
        }

        return item;
      });
    },
  },
});

export const { setField } = appFormSlice.actions;
export default appFormSlice.reducer;
