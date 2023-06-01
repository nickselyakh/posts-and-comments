import React, { useEffect } from 'react'
import { Spin, Typography } from 'antd'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectPosts } from '../PostList/postsSlice'

import { Comment } from './Comment'
import { selectComments } from './commentsSlice'
import { getComments } from './api'
import classes from './Comments.module.css'

const { Title } = Typography

/**
 * @description Displays Comments list with the opportunity to reply,
 * expand/collapse nested replies and add new tag to the root comment
 */
export const Comments: React.FC = () => {
  const { loading, error, comments } = useAppSelector(selectComments)
  const { selectedPostId } = useAppSelector(selectPosts)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (selectedPostId) {
      dispatch(getComments(selectedPostId))
    }
  }, [selectedPostId, dispatch])

  return (
    <section className={classes.container}>
      <Title level={2} className={classes.title}>
        {!selectedPostId ? 'Select post to see comments!' : 'Comments'}
      </Title>
      <Spin spinning={loading}>
        {comments.map(({ id, name, body, replies, tags }) => (
          <Comment key={id} name={name} id={id} text={body} tags={tags} replies={replies} commentId={id} />
        ))}
      </Spin>
      {error && <Title>{error}</Title>}
    </section>
  )
}
