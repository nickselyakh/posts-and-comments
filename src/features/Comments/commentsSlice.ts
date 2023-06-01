import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Comment, CommentsState, Reply, Tag } from '../../types'
import { RootState } from '../../app/store'
import { getComments, addComment } from './api'

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    reply: (state, { payload }: PayloadAction<Reply>) => {
      state.comments = state.comments.map((comment) =>
        payload.commentId === comment.id ? { ...comment, replies: [...(comment.replies || []), payload] } : comment
      )
    },
    addCommentTag: (state, { payload }: PayloadAction<{ tag: Tag; commentId: Comment['id'] }>) => {
      state.comments = state.comments.map((comment) =>
        payload.commentId === comment.id ? { ...comment, tags: [...(comment.tags || []), payload.tag] } : comment
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.loading = true
        state.error = null
        state.comments = []
      })
      .addCase(getComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.loading = false
        state.error = null
        state.comments = action.payload
      })
      .addCase(getComments.rejected, (state) => {
        state.loading = false
        state.error = 'Failed to fetch!'
        state.comments = []
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true
        state.error = null
        state.comments = []
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        state.loading = false
        state.error = null
        state.comments.push(action.payload)
      })
      .addCase(addComment.rejected, (state) => {
        state.loading = false
        state.error = 'Failed to fetch!'
        state.comments = []
      })
  },
})

export const { reply, addCommentTag } = commentsSlice.actions

export const selectComments = (state: RootState) => state.comments

export default commentsSlice.reducer
