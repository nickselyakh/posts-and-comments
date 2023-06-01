import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TagsState, Tag } from '../../types'
import { RootState } from '../../app/store'

const initialState: TagsState = {
  tags: [],
}

// Global tags array as we don't have it in our mock DB
export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: (state, { payload }: PayloadAction<Tag>) => {
      if (!state.tags.map(({ name }) => name).includes(payload.name)) {
        state.tags.push(payload)
      }
    },
  },
})

export const { addTag } = tagsSlice.actions

export const selectTags = (state: RootState) => state.tags

export default tagsSlice.reducer
