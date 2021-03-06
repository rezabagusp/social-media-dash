import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { client } from '../../api/client'
import type { Post } from '../../type/post';
import type { FetchStatus } from '../../type/misc';
import type { Comment } from '../../type/comment';

export interface InitialState {
  post: Post | null,
  fetchPostByIdStatus:  FetchStatus,
  comments: Comment[],
  fetchCommentByPostIdStatus:  FetchStatus,
}

const initialState: InitialState = {
  post: null,
  fetchPostByIdStatus: 'idle',
  comments: [],
  fetchCommentByPostIdStatus: 'idle',
};

export const fetchPostById = createAsyncThunk('userPost/fetchPostById', async (postId: number) => {
  const response = await client.get(`/posts/${postId}`);
  return response.data
});

export const fetchCommentByPostId = createAsyncThunk('userPost/fetchCommentByPostId', async (postId: number) => {
  const response = await client.get(`/posts/${postId}/comments`);
  return response.data
});

export const deleteCommentById = createAsyncThunk('userPost/deleteCommentById', async (commentId: Comment['id']) => {
  const response = await client.delete(`/comments/${commentId}`);
  return response.data
});

export const addNewComment = createAsyncThunk('userPost/addNewComment', async (payload: Comment) => {
  const response = await client.post('/comments', payload);
  return response.data
});

export const editComment = createAsyncThunk('userPost/editComment', async (payload: Comment) => {
  const response = await client.put(`/comments/${payload.id}`, payload);
  return response.data
});

export const postDetail = createSlice({
  name: 'postDetail',
  initialState,
  reducers: {
    commentDeleted(state, action) {
      state.comments  = state.comments.filter((comment) => comment.id !== action.payload);
    },
  }, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostById.pending, (state) => {
        state.fetchPostByIdStatus = 'loading';
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.fetchPostByIdStatus = 'succeeded';
        state.post = action.payload;
      })
      .addCase(fetchPostById.rejected, (state) => {
        state.fetchPostByIdStatus = 'failed';
      })
      .addCase(fetchCommentByPostId.pending, (state) => {
        state.fetchCommentByPostIdStatus = 'loading';
      })
      .addCase(fetchCommentByPostId.fulfilled, (state, action) => {
        state.fetchCommentByPostIdStatus = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchCommentByPostId.rejected, (state) => {
        state.fetchCommentByPostIdStatus = 'failed';
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.comments = [
          {
            ...action.payload
          },
          ...state.comments,
        ];
      })
      .addCase(editComment.fulfilled, (state, action) => {
        const newComments: Comment[] = state.comments.map((comment: Comment) => {
          if (comment.id === action.payload.id) {
            return action.payload;
          }
          return comment;
        })

        state.comments = newComments;
      })
  },
});

export const { commentDeleted } = postDetail.actions;

export const selectData = (rootState: RootState) => rootState.postDetail;

export default postDetail.reducer;
