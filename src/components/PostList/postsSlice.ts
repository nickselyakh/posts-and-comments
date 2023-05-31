import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { NormalizedUsers, Post, PostsState } from '../../types'
import { RootState } from '../../app/store'
import { getPosts, getUsers } from './api'

const initialState: PostsState = {
  posts: [],
  users: {},
  loading: false,
  error: null,
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    togglePost: (state, { payload }: PayloadAction<Post['id'] | undefined>) => {
      state.selectedPostId = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true
        state.error = null
        state.posts = []
      })
      .addCase(getPosts.fulfilled, (state, { payload }: PayloadAction<Post[]>) => {
        state.loading = false
        state.error = null
        state.posts = payload
      })
      .addCase(getPosts.rejected, (state) => {
        state.loading = false
        state.error = 'Failed to fetch!'
        state.posts = []
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = true
        state.error = null
        state.users = {}
      })
      .addCase(getUsers.fulfilled, (state, { payload }: PayloadAction<NormalizedUsers>) => {
        state.loading = false
        state.error = null
        state.users = payload
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false
        state.error = 'Failed to fetch users!'
        state.users = {}
      })
  },
})

export const { togglePost } = postsSlice.actions

export const selectPosts = (state: RootState) => state.posts

export default postsSlice.reducer
