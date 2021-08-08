import { Article } from "./article"
import Model from "./model"

export interface Blog extends Model<string>, Article {
  id: string
  alias: string
  artworkUrl?: string
  title?: string
  updatedAt?: string
  tags?: Array<string>
  excerpt?: string
  content?: string
  createdAt?: string
}

export class BlogGroup {
  latestBlog?: Array<Blog>
  featuredBlog?: Array<Blog>
  trunkedBlog?: Array<Blog>
}
