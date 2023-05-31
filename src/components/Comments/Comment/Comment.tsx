import React, { useState } from 'react'
import { Typography, Button, Input, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import { Comment as CommentType, Reply, Tag } from '../../../types'
import { reply } from '../commentsSlice'
import { useAppDispatch } from '../../../app/hooks'

import { TagList } from './TagList/TagList'
import classes from './Comment.module.css'

const { Text } = Typography

export type CommentProps = {
  name: CommentType['name']
  text: CommentType['body']
  id: number
  commentId: CommentType['id']
  replies?: Reply[]
  tags?: Tag[]
}

export const Comment: React.FC<CommentProps> = ({ name, text, id, commentId, replies: rawReplies = [], tags = [] }) => {
  const [replyFieldVisible, setReplyFieldVisible] = useState<boolean>(false)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const replies = isExpanded ? rawReplies : rawReplies.length ? [rawReplies[0]] : []

  const [replyBody, setReplyBody] = useState<string>()

  const handleReply = (): void => {
    if (replyBody) {
      dispatch(reply({ id: Math.random(), body: replyBody, name: 'Your name', commentId }))
    }
    setReplyBody('')
    setReplyFieldVisible(false)
  }

  return (
    <div className={classes.container}>
      <Space direction="vertical">
        <Space direction="horizontal">
          <Text strong>{name}</Text>
          {id === commentId && <TagList commentTags={tags} commentId={commentId} />}
        </Space>
        <Text>{text}</Text>
        <Button type="text" className={classes.replyControl} size="small" onClick={() => setReplyFieldVisible(true)}>
          Reply
        </Button>
      </Space>

      {replyFieldVisible && (
        <Input
          placeholder="Enter your reply"
          value={replyBody}
          className={classes.field}
          autoFocus
          onPressEnter={handleReply}
          onBlur={handleReply}
          onChange={(e) => setReplyBody(e.target.value)}
        />
      )}

      <div className={classes.replies}>
        {replies.map((reply) => (
          <Comment key={reply.id} id={reply.id} name={reply.name} text={reply.body} commentId={commentId} />
        ))}
        {rawReplies?.length > 1 && (
          <Button
            type="text"
            icon={<DownOutlined style={{ transform: `rotate(${isExpanded ? 180 : 0}deg)` }} />}
            onClick={() => setIsExpanded((prevExpanded) => !prevExpanded)}
          >
            {isExpanded ? 'Hide replies' : `View ${rawReplies.length - 1} replies`}
          </Button>
        )}
      </div>
    </div>
  )
}
