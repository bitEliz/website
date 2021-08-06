import { TileAttributes } from "./tile-attributes"

export interface Article extends TileAttributes {
  excerpt?: string
  content?: string
}
