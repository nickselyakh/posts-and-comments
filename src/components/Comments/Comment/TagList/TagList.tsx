import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Tag, Select, SelectProps } from 'antd'

import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { addTag, selectTags } from './tagsSlice'
import { addCommentTag } from '../../commentsSlice'
import { Comment, Tag as TagType } from '../../../../types'

type TagListProps = SelectProps & {
  commentId: Comment['id']
  commentTags: TagType[]
}

export const TagList: React.FC<TagListProps> = ({ commentTags, commentId }) => {
  const { tags } = useAppSelector(selectTags)
  const dispatch = useAppDispatch()
  const [isSelectVisible, setIsSelectVisible] = useState(false)
  const [name, setName] = useState('')

  const handleAddTag = () => {
    if (name) {
      if (commentTags.map(({ name }) => name).indexOf(name) === -1) {
        dispatch(addCommentTag({ name, commentId }))
      }

      if (tags.map(({ name }) => name).indexOf(name) === -1) {
        dispatch(addTag({ name }))
      }
    }
    setIsSelectVisible(false)
    setName('')
  }

  const handleChange = (value: string) => {
    setName(value)
  }

  return (
    <>
      {commentTags.map(({ name }) => (
        <Tag key={name}>{name}</Tag>
      ))}
      {isSelectVisible ? (
        <Select
          autoFocus
          size="small"
          showSearch
          value={name}
          onSearch={handleChange}
          onChange={handleChange}
          onBlur={handleAddTag}
          options={tags.map(({ name }) => ({ label: name, value: name }))}
        />
      ) : (
        <Tag onClick={() => setIsSelectVisible(true)} style={{ borderStyle: 'dashed' }}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  )
}
