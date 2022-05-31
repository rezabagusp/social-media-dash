import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { client } from '../../api/client'
import type { User } from '../../type/user';
import type { FetchStatus } from '../../type/misc';

export interface InitialState {
  users: User[],
  fetchStatus: FetchStatus,
}

const initialState: InitialState = {
  users: [],
  fetchStatus: 'idle',
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await client.get('/users')
  return response.data
})

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.fetchStatus = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        // Add any fetched posts to the array
        state.users = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.fetchStatus = 'failed';
      })
  },
});

export const selectData = (rootState: RootState) => rootState.user;

export default user.reducer;
