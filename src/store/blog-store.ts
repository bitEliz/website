import { Context } from "@nuxt/types"
import { Module, VuexAction, VuexModule, VuexMutation } from "nuxt-property-decorator"
import { Loadable } from "../utils/loadable"
import { Blog } from "~/models/blog"

@Module({ name: "blog-store", stateFactory: true, namespaced: true })
export default class BlogStore extends VuexModule implements Loadable {
  // MARK: Properties
  isLoading: boolean = false
  private _blog?: Blog

  get blog(): Blog | undefined {
    return this._blog
  }

  // MARK: Mutations
  @VuexMutation
  setLoadingState(isLoading: boolean) {
    this.isLoading = isLoading
  }

  @VuexMutation
  setBlog(newValue?: Blog) {
    this._blog = newValue
  }

  // MARK: Actions
  @VuexAction({ rawError: true })
  async onLoading(ctx: Context): Promise<void> {
    this.setLoadingState(true)
    try {
      const blog: Blog = await ctx.app.$http.$get(`/blog/${ctx.params.id}`)
      this.setBlog(blog)
      this.setLoadingState(false)
    } catch (error) {
      this.setLoadingState(false)
      throw error
    }
  }
}
