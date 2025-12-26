import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TransactionState {
  isTransactionProccesing: boolean;
}

const initialState: TransactionState = {
  isTransactionProccesing: false,
};

export const transactionSlice = createSlice({
  name: 'TransactionState',
  initialState,
  reducers: {
    set_transactionState_started: (state, action: PayloadAction<boolean>) => {
      state.isTransactionProccesing = true;
    },
    set_transactionState_succes: (state, action: PayloadAction<boolean>) => {
      state.isTransactionProccesing = false;
    },
    set_transactionState_ended: (state, action: PayloadAction<boolean>) => {
      state.isTransactionProccesing = false;
    },
  },
});

export const TransactionStateActions = transactionSlice.actions;
export default transactionSlice.reducer;
