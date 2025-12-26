import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Success {
  showSuccessModal: boolean;
  message: string;
  actionOnButtonClick: Function;
}

const initialState: Success = {
  showSuccessModal: false,
  message: '',
  actionOnButtonClick: () => {},
};

export const successSlice = createSlice({
  name: 'SuccessState',
  initialState,
  reducers: {
    setSuccessModal: (state, action: PayloadAction<boolean>) => {
      state.showSuccessModal = action.payload;
    },
    setSuccessMessage: (state, action: PayloadAction<any>) => {
      state.message = action.payload;
    },
    setActionOnButtonClick: (state, action: PayloadAction<Function>) => {
      state.actionOnButtonClick = action.payload;
    },
  },
});

export const SuccessStateActions = successSlice.actions;
export default successSlice.reducer;
