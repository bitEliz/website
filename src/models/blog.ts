import { Article } from './article';
import { Model } from "./model";

export class Blog extends Model<string> implements Article {
  id!: string;
  media?: string;
  headline?: string;
  timestamp?: string;
  tags?: Array<string>;
  excerpt?: string;
  content?: string;
}

export class BlogGroup {
  latestBlog?: Array<Blog>;
  featuredBlog?: Array<Blog>;
  trunkedBlog?: Array<Blog>;
}
