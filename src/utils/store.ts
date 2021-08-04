import { Store } from "vuex"
import { getModule } from "vuex-module-decorators"
import BlogStore from "~/store/blog-store"
import BlogListStore from "~/store/blog-list-store"
import PureMDFileStore from "~/store/pure-md-file-store"

/* eslint-disable import/no-mutable-exports */
let blogStore: BlogStore
let blogListStore: BlogListStore
let pureMDFileStore: PureMDFileStore

function typedStore(store: Store<any>): void {
  pureMDFileStore = getModule(PureMDFileStore, store)
  blogListStore = getModule(BlogListStore, store)
  blogStore = getModule(BlogStore, store)
}

export { typedStore, blogListStore, blogStore, pureMDFileStore }
