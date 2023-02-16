/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { IPost } from '@/interfaces';

export interface CounterState {
  isOpen: boolean;
  isLoading: boolean;
  isEditModelOpen: boolean;
  isDeleteModalOpen: boolean;
  editData: IPost;
  showProgressBar: boolean;
}

const initialState: CounterState = {
  isOpen: false,
  isEditModelOpen: false,
  isDeleteModalOpen: false,
  isLoading: false,
  showProgressBar: false,
  editData: {
    id: 0,
    name: '',
    email: '',
  },
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    handleToggle: (state) => {
      state.isOpen = !state.isOpen;
    },
    handleTableActions: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-nested-ternary
      action.payload === 'edit'
        ? (state.isEditModelOpen = !state.isEditModelOpen)
        : action.payload === 'delete'
        ? (state.isDeleteModalOpen = !state.isDeleteModalOpen)
        : null;
    },
    handleData: (state, action: PayloadAction<any>) => {
      state.editData = action.payload;
    },
    handlePageLoad: (state) => {
      state.isLoading = !state.isLoading;
    },
    handleLoading: (state) => {
      state.showProgressBar = !state.showProgressBar;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  handleToggle,
  handleTableActions,
  handleData,
  handlePageLoad,
  handleLoading,
} = counterSlice.actions;

export default counterSlice.reducer;
