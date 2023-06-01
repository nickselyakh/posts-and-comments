import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../features/PostList/postsSlice'
import commentsReducer from '../features/Comments/commentsSlice'
import tagsReducer from '../features/TagList/tagsSlice'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    tags: tagsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
