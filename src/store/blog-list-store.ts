import { Context } from "@nuxt/types"
import { Module, VuexAction, VuexModule, VuexMutation } from "nuxt-property-decorator"
import { Loadable } from "../utils/loadable"
import { Blog, BlogGroup } from "~/models/blog"

@Module({ name: "blog-list-store", stateFactory: true, namespaced: true })
export default class BlogListStore extends VuexModule implements Loadable {
  // MARK: Properties
  isLoading: boolean = false
  latestBlog: Array<Blog> = []
  featuredBlog: Array<Blog> = []
  trunkedBlog: Array<Blog> = []

  // MARK: Mutations
  @VuexMutation
  setLoadingState(isLoading: boolean) {
    this.isLoading = isLoading
  }

  @VuexMutation
  setLatestBlog(list?: Array<Blog>) {
    this.latestBlog = list ?? []
  }

  @VuexMutation
  setFeaturedBlog(list?: Array<Blog>) {
    this.featuredBlog = list ?? []
  }

  @VuexMutation
  setTrunkedBlog(list?: Array<Blog>) {
    this.trunkedBlog = list ?? []
  }

  // MARK: Actions
  @VuexAction({ rawError: true })
  async onLoading(context: Context): Promise<void> {
    this.setLoadingState(true)
    try {
      const blogGroup: BlogGroup = await context.app.$http.$get(`users/${context.$config.uid}/blog`)
      this.setLatestBlog(blogGroup.latestBlog)
      this.setFeaturedBlog(blogGroup.featuredBlog)
      this.setTrunkedBlog(blogGroup.trunkedBlog)
      this.setLoadingState(false)
    } catch (error) {
      this.setLoadingState(false)
      throw error
    }
  }
}
