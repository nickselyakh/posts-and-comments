import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import postsReducer from '../components/PostList/postsSlice'
import commentsReducer from '../components/Comments/commentsSlice'
import tagsReducer from '../components/Comments/Comment/TagList/tagsSlice'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    tags: tagsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
