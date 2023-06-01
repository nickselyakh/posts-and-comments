export type Post = {
  userId: number
  id: string
  title: string
  body: string
}

export type CommentInput = {
  postId: number
  name: string
  body: string
}

export type Tag = {
  name: string
}

/**
 * We don't have replies and tags in DB,
 * so it will be stored locally
 */
export type Comment = {
  postId: number
  id: number
  name: string
  email: string
  body: string
  replies?: Reply[]
  tags?: Tag[]
}

export type NormalizedUsers = { [key: string]: string }

export type PostsState = {
  users: NormalizedUsers
  posts: Post[]
  selectedPostId?: Post['id']
  loading: boolean
  error: string | null
}

export type Reply = {
  id: number
  name: string
  commentId: Comment['id']
  body: string
}

export type CommentsState = {
  comments: Comment[]
  loading: boolean
  error: string | null
}

export type TagsState = {
  tags: Tag[]
}

export type User = {
  id: string
  name: string
}
