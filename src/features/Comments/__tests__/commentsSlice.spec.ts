import { CommentsState, Comment, Reply as ReplyType, Tag } from '../../../types'
import commentsReducer, { reply, addCommentTag } from '../commentsSlice'

describe('Comments reducer', () => {
  const tag: Tag = { name: 'tag' }
  const comment: Comment = { postId: 1, id: 1, name: 'comment', email: 'email', body: 'comment body' }
  const initialState: CommentsState = {
    comments: [comment],
    loading: false,
    error: null,
  }
  const mockReply: ReplyType = {
    id: 1,
    name: 'reply',
    commentId: 1,
    body: 'reply body',
  }

  it('Should handle initial state', () => {
    expect(commentsReducer(undefined, { type: 'unknown' })).toEqual({ comments: [], loading: false, error: null })
  })

  it('Should handle reply', () => {
    const actual = commentsReducer(initialState, reply(mockReply))
    expect(actual.comments[0]).toEqual({ ...comment, replies: [mockReply] })
  })

  it('Should handle addCommentTag', () => {
    const actual = commentsReducer(initialState, addCommentTag({ tag, commentId: comment.id }))
    expect(actual.comments[0]).toEqual({ ...comment, tags: [tag] })
  })
})
