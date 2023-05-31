import React, { memo, useEffect } from 'react'
import { Spin, Typography } from 'antd'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectPosts } from '../PostList/postsSlice'

import { Comment } from './Comment'
import { selectComments } from './commentsSlice'
import { getComments } from './api'

const { Title } = Typography

export const Comments: React.FC = memo(() => {
  const { loading, error, comments } = useAppSelector(selectComments)
  const { selectedPostId } = useAppSelector(selectPosts)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (selectedPostId) {
      dispatch(getComments(selectedPostId))
    }
  }, [selectedPostId, dispatch])

  if (!selectedPostId) return <Title level={5}>Select post to see comments!</Title>

  return (
    <>
      <Title level={2}>Comments</Title>
      <Spin spinning={loading}>
        {comments.map(({ id, name, body, replies, tags }) => (
          <Comment key={id} name={name} id={id} text={body} tags={tags} replies={replies} commentId={id} />
        ))}
      </Spin>
      {error && <Title>{error}</Title>}
    </>
  )
})
