import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'

import { TagList } from '../TagList'
import { store } from '../../../app/store'

describe('TagList', () => {
  const commentId = 1
  const newTagName = 'New Tag'
  const commentTags = [{ name: 'Tag 1' }, { name: 'Tag 2' }]

  test('Renders the existing comment tags successfully', () => {
    const { container } = render(
      <Provider store={store}>
        <TagList ownTags={commentTags} commentId={commentId} />
      </Provider>
    )

    expect(container).toMatchSnapshot()
  })

  test('Opens creating dropdown', () => {
    render(
      <Provider store={store}>
        <TagList ownTags={commentTags} commentId={commentId} />
      </Provider>
    )

    const newTagButton = screen.getByText(/New Tag/i)
    fireEvent.click(newTagButton)
    const selectDropdown = screen.getByRole('combobox')
    expect(selectDropdown).toBeInTheDocument()
  })

  test('Adds a new comment tag', () => {
    render(
      <Provider store={store}>
        <TagList ownTags={commentTags} commentId={commentId} />
      </Provider>
    )
    const newTagButton = screen.getByText(/New Tag/i)

    fireEvent.click(newTagButton)

    const selectDropdown = screen.getByRole('combobox')
    fireEvent.change(selectDropdown, { target: { value: newTagName } })

    fireEvent.blur(selectDropdown)

    expect(screen.getByText(newTagName)).toBeInTheDocument()
  })
})
