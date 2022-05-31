import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { client } from '../../api/client'
import type { User } from '../../type/user';

export interface InitialState {
  users: User[],
  fetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed',
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
  name: 'counter',
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


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectData = (rootState: RootState) => rootState.user;

export default user.reducer;
