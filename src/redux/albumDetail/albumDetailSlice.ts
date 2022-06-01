import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { client } from '../../api/client'
import type { Album } from '../../type/album';
import type { Photo } from '../../type/photo';
import type { FetchStatus } from '../../type/misc';

export interface InitialState {
  album: Album | null,
  fetchAlbumByIdStatus: FetchStatus,
  photos: Photo[],
  fetchPhotosStatus: FetchStatus,
}

const initialState: InitialState = {
  album: null,
  fetchAlbumByIdStatus: 'idle',
  photos: [],
  fetchPhotosStatus: 'idle',
};

export const fetchAlbumById = createAsyncThunk('/fetchAlbumById', async (albumId: number) => {
  const response = await client.get(`/albums/${albumId}`);
  return response.data
})

export const fetchPhotos = createAsyncThunk('/fetchPhotos', async (albumId: number) => {
  const response = await client.get(`/albums/${albumId}/photos`);
  return response.data
})

export const albumDetail = createSlice({
  name: 'userAlbum',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumById.pending, (state) => {
        state.fetchAlbumByIdStatus = 'loading';
      })
      .addCase(fetchAlbumById.fulfilled, (state, action) => {
        state.fetchAlbumByIdStatus = 'succeeded';
        state.album = action.payload;
      })
      .addCase(fetchAlbumById.rejected, (state) => {
        state.fetchAlbumByIdStatus = 'failed';
      })
      .addCase(fetchPhotos.pending, (state) => {
        state.fetchPhotosStatus = 'loading';
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.fetchPhotosStatus = 'succeeded';
        state.photos = action.payload;
      })
      .addCase(fetchPhotos.rejected, (state) => {
        state.fetchPhotosStatus = 'failed';
      })
  },
});

export const selectData = (rootState: RootState) => rootState.albumDetail;

export default albumDetail.reducer;
