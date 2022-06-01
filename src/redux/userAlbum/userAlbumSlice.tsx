import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { client } from '../../api/client'
import type { User } from '../../type/user';
import type { Album } from '../../type/album';
import type { FetchStatus } from '../../type/misc';

export interface InitialState {
  user: User | null,
  fetchUserByIdStatus: FetchStatus,
  albums: Album[],
  fetchAlbumStatus: FetchStatus,
}

const initialState: InitialState = {
  user: null,
  fetchUserByIdStatus: 'idle',
  albums: [],
  fetchAlbumStatus: 'idle',
};

export const fetchUserById = createAsyncThunk('userAlbum/fetchUserById', async (userId: number) => {
  const response = await client.get(`/users/${userId}`);
  return response.data
})

export const fetchUserAlbum = createAsyncThunk('userAlbum/fetchUserAlbum', async (userId: number) => {
  const response = await client.get(`/users/${userId}/albums`);
  return response.data
})

export const userAlbum = createSlice({
  name: 'userAlbum',
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
      .addCase(fetchUserAlbum.pending, (state) => {
        state.fetchAlbumStatus = 'loading';
      })
      .addCase(fetchUserAlbum.fulfilled, (state, action) => {
        state.fetchAlbumStatus = 'succeeded';
        state.albums = action.payload;
      })
      .addCase(fetchUserAlbum.rejected, (state) => {
        state.fetchAlbumStatus = 'failed';
      })
  },
});

export const selectData = (rootState: RootState) => rootState.userAlbum;

export default userAlbum.reducer;
