import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Blog } from "~/models/blog";
import { $http } from "~/utils/http";
import { Loadable } from "../utils/loadable";

@Module({ name: "blog-store", stateFactory: true, namespaced: true })
export default class BlogStore extends VuexModule implements Loadable {
  // MARK: Properties
  isLoading: boolean = false;
  private _blog?: Blog;

  get blog(): Blog | undefined {
    return this._blog;
  };

  // MARK: Mutations
  @Mutation
  setLoadingState(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  @Mutation
  setBlog(newValue?: Blog) {
    this._blog = newValue;
  }

  // MARK: Actions
  @Action({ rawError: true })
  async onLoading(id: string): Promise<void> {
    this.setLoadingState(true);
    try {
      let blog: Blog = await $http.$get(`/blog/${id}`);
      this.setBlog(blog);
      this.setLoadingState(false);
    } catch (error) {
      this.setLoadingState(false);
      throw error;
    }
  }
}
