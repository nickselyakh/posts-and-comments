import React, { useState, useMemo } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Tag, Select } from 'antd'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addTag, selectTags } from './tagsSlice'
import { addCommentTag } from '../Comments/commentsSlice'
import { Comment, Tag as TagType } from '../../types'

import classes from './TagList.module.css'

type TagListProps = {
  commentId: Comment['id']
  ownTags: TagType[]
}

/**
 * @description Provides TagList component.
 * This component uses global `tags` values, that contains of already
 * created tags (on the first load there is no `tags`).
 * @param ownTags already created and assigned to comment tags
 * @param commentId comment id to witch we want add tags
 * @returns Tag list with the opportunity to add new one
 */
export const TagList: React.FC<TagListProps> = ({ ownTags, commentId }) => {
  const { tags } = useAppSelector(selectTags)
  const dispatch = useAppDispatch()
  const [isSelectVisible, setIsSelectVisible] = useState(false)
  const [name, setName] = useState('')

  const normalizedOptions = useMemo(
    () =>
      tags
        .filter(({ name }) => !ownTags.map(({ name: ownName }) => ownName).includes(name))
        .map(({ name }) => ({ label: name, value: name })),
    [tags, ownTags]
  )

  const handleAddTag = () => {
    if (name) {
      // Add tag to comment if not exist
      if (ownTags.map(({ name }) => name).indexOf(name) === -1) {
        dispatch(addCommentTag({ tag: { name }, commentId }))
      }

      // Add tag to global tags array if not exist (as we don't have endpoint)
      if (tags.map(({ name }) => name).indexOf(name) === -1) {
        dispatch(addTag({ name }))
      }
    }

    setIsSelectVisible(false)
    setName('')
  }

  const handleChange = (value: string) => {
    setName(value.trim())
  }

  return (
    <>
      {ownTags.map(({ name }) => (
        <Tag key={name}>{name}</Tag>
      ))}
      {isSelectVisible ? (
        <Select
          autoFocus
          size="small"
          className={classes.select}
          showSearch
          value={name}
          notFoundContent={<span className={classes.placeholder}>Unfocus to add</span>}
          onSearch={handleChange}
          onChange={handleChange}
          onBlur={handleAddTag}
          options={normalizedOptions}
        />
      ) : (
        <Tag onClick={() => setIsSelectVisible(true)} className={classes.blankTag}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  )
}
