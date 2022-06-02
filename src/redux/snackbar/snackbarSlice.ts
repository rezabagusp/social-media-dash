import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

export interface InitialState {
  isShow: boolean,
  message: string,
}

const initialState: InitialState = {
  isShow: false,
  message: '',
};

export const snackbar = createSlice({
  name: 'postDetail',
  initialState,
  reducers: {
    snackbarShow(state, action) {
      state.isShow  = true;
      state.message = action.payload;
    },
    snackbarHide(state) {
      state.isShow  = false;
    },
  },
});

export const { snackbarShow, snackbarHide } = snackbar.actions;

export const selectData = (rootState: RootState) => rootState.snackbar;

export default snackbar.reducer;
