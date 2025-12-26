import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Error {
  showErrorModal: boolean;
  errorMessage: string;
  actionOnButtonClick: Function;
}

const initialState: Error = {
  showErrorModal: false,
  errorMessage: '',
  actionOnButtonClick: () => {},
};

export const errorSlice = createSlice({
  name: 'ErrorState',
  initialState,
  reducers: {
    setErrorModal: (state, action: PayloadAction<boolean>) => {
      state.showErrorModal = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<any>) => {
      state.errorMessage = action.payload;
    },
    setActionOnButtonClick: (state, action: PayloadAction<Function>) => {
      state.actionOnButtonClick = action.payload;
    },
  },
});

export const ErrorStateActions = errorSlice.actions;
export default errorSlice.reducer;
