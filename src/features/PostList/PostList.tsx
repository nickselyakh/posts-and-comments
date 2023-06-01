import React, { useEffect, useMemo, useState } from 'react'
import { Card, Input, Space, Spin, Tooltip } from 'antd'
import classNames from 'classnames'

import { useAppDispatch, useAppSelector } from '../../app/hooks'

import { togglePost, selectPosts } from './postsSlice'
import { getPosts, getUsers } from './api'
import classes from './PostList.module.css'

/**
 * @description Provides PostList component with the opportunity
 * to search by username, userId and post content.
 * Note: In the real life we can use infinite scroll here,
 * as posts length can be big enough
 */
export const PostList: React.FC = () => {
  const { loading, error, posts, users, selectedPostId } = useAppSelector(selectPosts)
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState<string>('')

  const normalizedPosts = useMemo(
    () =>
      posts
        .map((post) => ({ ...post, userName: users[post.userId] }))
        .filter(
          ({ userName, userId, body }) =>
            userName?.toLowerCase().includes(searchValue) ||
            String(userId).includes(searchValue) ||
            body?.toLowerCase().includes(searchValue)
        ),
    [posts, users, searchValue]
  )

  useEffect(() => {
    dispatch(getPosts())
    dispatch(getUsers())
  }, [dispatch])

  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  if (error) return <h1>Error!</h1>

  return (
    <>
      <Input placeholder="Search" value={searchValue} onChange={({ target: { value } }) => handleSearch(value)} />
      <Spin spinning={loading}>
        <Space direction="vertical" size="middle" className={classes.list}>
          {normalizedPosts.map(({ id, title, body, userName }) => (
            <Card
              hoverable
              onClick={() => dispatch(togglePost(selectedPostId === id ? undefined : id))}
              key={id}
              title={
                <Tooltip title={title} placement="topLeft">
                  {title}
                </Tooltip>
              }
              extra={userName}
              className={classNames({ [classes.active]: selectedPostId === id })}
            >
              <p>{body}</p>
            </Card>
          ))}
        </Space>
      </Spin>
    </>
  )
}
