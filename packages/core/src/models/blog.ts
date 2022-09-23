import Identifiable from './identifiable'
import { User } from './user'

export interface Blog extends Identifiable<number> {
  alias: string
  title: string
  excerpt: string
  content?: string
  artworkUrl?: string
  tags?: Array<string>
  user?: User
  userId?: number
  categories: Array<BlogCategory>
  createdAt?: string
}

export interface BlogCategory extends Identifiable<number> {
  name: string
  blog?: Array<Blog>
}

export interface BlogGroup {
  latestBlog?: Array<Blog>
  featuredBlog?: Array<Blog>
  trunkedBlog?: Array<Blog>
}
