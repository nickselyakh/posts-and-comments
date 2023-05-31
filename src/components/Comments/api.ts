import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { Comment, Post } from '../../types'
import { API_ROUTES } from '../../constants'

export const getComments = createAsyncThunk('comments/getComments', async (postId: Post['id']) => {
  const { data } = await axios.get<Comment[]>(`${API_ROUTES.COMMENTS}?postId=${postId}`)

  return data
})

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (payload: { title: string; body: string; userId: number }) => {
    const { data } = await axios.post<Comment>(API_ROUTES.COMMENTS, payload)

    return data
  }
)
