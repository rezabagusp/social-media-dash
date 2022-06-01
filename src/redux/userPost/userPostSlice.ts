import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { client } from '../../api/client'
import type { User } from '../../type/user';
import type { FetchStatus } from '../../type/misc';
import type { Post } from '../../type/post';

export interface InitialState {
  user: User | null,
  fetchUserByIdStatus: FetchStatus,
  userPosts: Post[],
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

export const addNewPost = createAsyncThunk('userPost/addNewPost', async (payload: Post) => {
  const response = await client.post(`/posts`, payload);
  return response.data
})

export const editPost = createAsyncThunk('userPost/editNewPost', async (payload: Post) => {
  const response = await client.put(`/posts/${payload.id}`, payload);
  return response.data
})

export const deletePost = createAsyncThunk('userPost/deletePost', async (postId: Post['id']) => {
  const response = await client.delete(`/posts/${postId}`);
  return response.data
})

export const userPost = createSlice({
  name: 'userPost',
  initialState,
  reducers: {
    userPostDeleted(state, action) {
      state.userPosts = state.userPosts.filter(userPost => userPost.id !== action.payload);
    }
  },
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
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.userPosts = [
          action.payload,
          ...state.userPosts,
        ]
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const newUserPosts: Post[] = state.userPosts.map((post: Post) => {
          if (post.id === action.payload.id) {
            return action.payload;
          }
          return post;
        })

        state.userPosts = newUserPosts;
      })
  },
});

export const { userPostDeleted } = userPost.actions;

export const selectData = (rootState: RootState) => rootState.userPost;

export default userPost.reducer;
