import React, { useEffect, useMemo, useState } from 'react'
import { Card, Input, Space, Spin } from 'antd'

import { useAppDispatch, useAppSelector } from '../../app/hooks'

import { togglePost, selectPosts } from './postsSlice'
import { getPosts, getUsers } from './api'

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
            String(userId).toLowerCase().includes(searchValue) ||
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
        <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '20px' }}>
          {normalizedPosts.map(({ id, title, body, userName }) => (
            <Card
              hoverable
              onClick={() => dispatch(togglePost(selectedPostId === id ? undefined : id))}
              key={id}
              title={title}
              extra={userName}
              style={{ background: selectedPostId === id ? '#dae3f2' : 'white' }}
            >
              <p>{body}</p>
            </Card>
          ))}
        </Space>
      </Spin>
    </>
  )
}
