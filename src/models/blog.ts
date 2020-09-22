import { Model } from "./model";
import { TileAttributes } from "./tile-attributes";

export class Blog extends Model<string> implements TileAttributes {
  id!: string;
  media?: string;
  headline?: string;
  timestamp?: string;
  categories?: Array<string>;

  get tag() {
    return this.categories?.join(" ");
  }
}
