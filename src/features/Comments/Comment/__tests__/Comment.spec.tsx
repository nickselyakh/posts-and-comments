import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'

import { Comment, CommentProps } from '../Comment'
import { store } from '../../../../app/store'

describe('Comment', () => {
  const commentProps: CommentProps = {
    name: 'John',
    text: 'This is a comment',
    id: 1,
    commentId: 1,
    replies: [
      { id: 2, name: 'Jane', body: 'Reply 1', commentId: 1 },
      { id: 3, name: 'Bob', body: 'Reply 2', commentId: 1 },
    ],
    tags: [{ name: 'tag1' }, { name: 'tag2' }],
  }

  test('Renders the comment with name and text', () => {
    render(
      <Provider store={store}>
        <Comment {...commentProps} />
      </Provider>
    )

    expect(screen.getByText(commentProps.name)).toBeInTheDocument()
    expect(screen.getByText(commentProps.text)).toBeInTheDocument()
  })

  test('Renders the reply button and input field when clicked', () => {
    render(
      <Provider store={store}>
        <Comment {...commentProps} />
      </Provider>
    )

    const replyButtons = screen.getAllByText('Reply')
    fireEvent.click(replyButtons[0])

    expect(screen.getByPlaceholderText('Enter your reply')).toBeInTheDocument()
  })

  test('Expands/collapses when "View replies" button is clicked', () => {
    render(
      <Provider store={store}>
        <Comment {...commentProps} />
      </Provider>
    )

    const viewRepliesButton = screen.getByText('View 1 replies')
    fireEvent.click(viewRepliesButton)

    const reply1 = screen.getByText('Reply 1')
    const reply2 = screen.getByText('Reply 2')

    expect(reply1).toBeInTheDocument()
    expect(reply2).toBeInTheDocument()

    fireEvent.click(screen.getByText('Hide replies'))

    expect(reply1).toBeInTheDocument()
    expect(reply2).not.toBeInTheDocument()
  })
})
