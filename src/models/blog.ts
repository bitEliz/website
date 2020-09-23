import { Model } from "./model";
import { TileAttributes } from "./tile-attributes";

export class Blog extends Model<string> implements TileAttributes {
  id!: string;
  media?: string;
  headline?: string;
  timestamp?: string;
  categories?: Array<string>;
  excerpt?: string;
  content?: string;

  get tag() {
    return this.categories?.join(" ");
  }
}

export class BlogGroup {
  latestBlog?: Array<Blog>;
  featuredBlog?: Array<Blog>;
  trunkedBlog?: Array<Blog>;
}
