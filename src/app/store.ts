import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../redux/user/userSlice';
import userPostReducer from '../redux/userPost/userPostSlice';
import postDetailReducer from '../redux/postDetail/postDetailSlice';
import userAlbumReducer from '../redux/userAlbum/userAlbumSlice';
import albumDetailReducer from '../redux/albumDetail/albumDetailSlice';
import snackbarReducer from '../redux/snackbar/snackbarSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    userPost: userPostReducer,
    postDetail: postDetailReducer,
    userAlbum: userAlbumReducer,
    albumDetail: albumDetailReducer,
    snackbar: snackbarReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
