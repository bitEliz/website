import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { $http } from "~/utils/http";
import { isString } from "~/utils/inspect";

@Module({ name: "static", stateFactory: true, namespaced: true })
export default class StaticStore extends VuexModule {
  isLoading = false;
  markdown: string = "";

  @Mutation
  setMarkdown(md?: string) {
    this.markdown = isString(md) ? md! : "";
  }

  @Mutation
  setLoadingState(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  @Action({ rawError: true })
  async onLoading(id: string) {
    this.setLoadingState(true);
    try {
      let file: string = await $http.$get(`/static/${id}`);
      this.setMarkdown(file);
      this.setLoadingState(false);
    } catch (error) {
      this.setLoadingState(false);
      throw error;
    }
  }
}
