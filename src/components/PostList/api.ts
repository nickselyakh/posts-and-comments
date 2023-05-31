import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { NormalizedUsers, Post, User } from '../../types'
import { API_ROUTES } from '../../constants'

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  const { data } = await axios.get<Post[]>(API_ROUTES.POSTS)

  return data
})

export const getUsers = createAsyncThunk('posts/getUsers', async () => {
  const { data } = await axios.get<User[]>(API_ROUTES.USERS)

  const users = data.reduce((acc: NormalizedUsers, { id, name }: User) => {
    acc[id] = name

    return acc
  }, {})

  return users
})
