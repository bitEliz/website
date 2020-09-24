import { TileAttributes } from "./tile-attributes";

export interface Article extends TileAttributes {
  categories?: Array<string>;
  excerpt?: string;
  content?: string;
}
