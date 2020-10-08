import { Article } from './article';
import { Model } from "./model";

export class Blog extends Model<string> implements Article {
  id!: string;
  alias!: string;
  artworkUrl?: string;
  title?: string;
  updatedAt?: string;
  tags?: Array<string>;
  excerpt?: string;
  content?: string;
}

export class BlogGroup {
  latestBlog?: Array<Blog>;
  featuredBlog?: Array<Blog>;
  trunkedBlog?: Array<Blog>;
}
