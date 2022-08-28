import type { MarkdownSfcBlocks } from '@mdit-vue/plugin-sfc'
import type { MarkdownItEnv, MarkdownItHeader } from '@mdit-vue/types'
import type MarkdownIt from 'markdown-it'
import type {
  AnchorPluginOptions,
  AssetsPluginOptions,
  CodePluginOptions,
  EmojiPluginOptions,
  FrontmatterPluginOptions,
  HeadersPluginOptions,
  ImportCodePluginOptions,
  LinksPluginOptions,
  SfcPluginOptions,
  TocPluginOptions
} from './plugins.js'

/**
 * Vuepress page frontmatter
 *
 * Notice that frontmatter is parsed from yaml or other languages,
 * so we cannot guarantee the type safety
 */
export type PageFrontmatter<
  T extends Record<any, any> = Record<string, unknown>
> = Partial<T> & {
  date?: string | Date
  description?: string
  head?: HeadConfig[]
  lang?: string
  layout?: string
  permalink?: string
  permalinkPattern?: string | null
  routeMeta?: Record<string, unknown>
  title?: string
}

export type Markdown = MarkdownIt
export type { MarkdownSfcBlocks }

export interface MarkdownOptions extends MarkdownIt.Options {
  anchor?: false | AnchorPluginOptions
  assets?: false | AssetsPluginOptions
  code?: false | CodePluginOptions
  component?: false
  emoji?: false | EmojiPluginOptions
  frontmatter?: false | FrontmatterPluginOptions
  headers?: false | HeadersPluginOptions
  title?: false
  importCode?: false | ImportCodePluginOptions
  links?: false | LinksPluginOptions
  sfc?: false | SfcPluginOptions
  slugify?: MarkdownSlugifyFunction
  toc?: false | TocPluginOptions
}

/**
 * Headers in markdown file
 */
export type MarkdownHeader = MarkdownItHeader

/**
 * Internal links in markdown file
 *
 * Used for file existence check
 */
export interface MarkdownLink {
  raw: string
  relative: string
  absolute: string
}

/**
 * The `env` object to be passed to markdown-it render function
 *
 * Input some meta data for markdown file parsing and rendering
 *
 * Output some resources from the markdown file
 */
export interface MarkdownEnv extends MarkdownItEnv {
  // Input

  /**
   * Base / publicPath of current site
   */
  base?: string

  /**
   * Absolute file path of the markdown file
   */
  filePath?: string | null

  /**
   * Relative file path of the markdown file
   */
  filePathRelative?: string | null

  /**
   * Frontmatter of the markdown file
   */
  frontmatter?: PageFrontmatter

  // Output

  /**
   * Imported file that extracted by importCodePlugin
   */
  importedFiles?: string[]

  /**
   * Links that extracted by linksPlugin
   */
  links?: MarkdownLink[]
}

/**
 * Type of `slugify` function
 */
export type MarkdownSlugifyFunction = (str: string) => string

/**
 * Config for `<head>` tags
 */
export type HeadConfig =
  | [HeadTagEmpty, HeadAttrsConfig]
  | [HeadTagNonEmpty, HeadAttrsConfig, string]

/**
 * Allowed tags in `<head>`
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head
 */
export type HeadTag = HeadTagNonEmpty | HeadTagEmpty

/**
 * Non-empty tags in `<head>`
 */
export type HeadTagNonEmpty =
  | 'title'
  | 'style'
  | 'script'
  | 'noscript'
  | 'template'

/**
 * Empty tags in `<head>`
 */
export type HeadTagEmpty = 'base' | 'link' | 'meta' | 'script'

/**
 * Attributes to be set for tags in `<head>`
 */
export type HeadAttrsConfig = Record<string, string | boolean>
