import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Blog, BlogGroup } from "~/models/blog";
import { $http } from "~/utils/http";
import { Loadable } from "../utils/loadable";

@Module({ name: "blog-list-store", stateFactory: true, namespaced: true })
export default class BlogListStore extends VuexModule implements Loadable {
  // MARK: Properties
  isLoading: boolean = false;
  latestBlog: Array<Blog> = [];
  featuredBlog: Array<Blog> = [];
  trunkedBlog: Array<Blog> = [];

  // MARK: Mutations
  @Mutation
  setLoadingState(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  @Mutation
  setLatestBlog(list?: Array<Blog>) {
    this.latestBlog = list ?? [];
  }

  @Mutation
  setFeaturedBlog(list?: Array<Blog>) {
    this.featuredBlog = list ?? [];
  }

  @Mutation
  setTrunkedBlog(list?: Array<Blog>) {
    this.trunkedBlog = list ?? [];
  }

  // MARK: Actions
  @Action({ rawError: true})
  async onLoading(): Promise<void> {
    this.setLoadingState(true);
    try {
      let blogGroup: BlogGroup = await $http.$get(`/blog`);
      this.setLatestBlog(blogGroup.latestBlog);
      this.setFeaturedBlog(blogGroup.featuredBlog);
      this.setTrunkedBlog(blogGroup.trunkedBlog);
      this.setLoadingState(false);
    } catch (error) {
      this.setLoadingState(false);
      console.log(error);
    }
  }
}
