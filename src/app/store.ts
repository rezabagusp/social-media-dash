import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../redux/user/userSlice';
import userPostReducer from '../redux/userPost/userPostSlice';
import postDetailReducer from '../redux/postDetail/postDetailSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    userPost: userPostReducer,
    postDetail: postDetailReducer,
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
