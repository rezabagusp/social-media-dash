import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { client } from '../../api/client'
import type { User } from '../../type/user';
import type { FetchStatus } from '../../type/misc';

export interface InitialState {
  user: User | null,
  fetchUserByIdStatus: FetchStatus,
  userPosts: [],
  fetchUserPostsStatus: FetchStatus,
}

const initialState: InitialState = {
  user: null,
  fetchUserByIdStatus: 'idle',
  userPosts: [],
  fetchUserPostsStatus: 'idle',
};

export const fetchUserById = createAsyncThunk('userPost/fetchUserById', async (userId: number) => {
  const response = await client.get(`/users/${userId}`);
  return response.data
})

export const fetchUserPosts = createAsyncThunk('userPost/fetchUserPosts', async (userId: number) => {
  const response = await client.get(`/users/${userId}/posts`);
  return response.data
})

export const userPost = createSlice({
  name: 'userPost',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.fetchUserByIdStatus = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.fetchUserByIdStatus = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state) => {
        state.fetchUserByIdStatus = 'failed';
      })
      .addCase(fetchUserPosts.pending, (state) => {
        state.fetchUserPostsStatus = 'loading';
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.fetchUserPostsStatus = 'succeeded';
        state.userPosts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state) => {
        state.fetchUserPostsStatus = 'failed';
      })
  },
});

export const selectData = (rootState: RootState) => rootState.userPost;

export default userPost.reducer;
