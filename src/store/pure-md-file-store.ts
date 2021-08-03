import { Context } from "@nuxt/types";
import { Module, VuexAction, VuexModule, VuexMutation } from "nuxt-property-decorator";
import { isString } from "~/utils/inspect";
import { Loadable } from "~/utils/loadable";

@Module({ name: "pure-md-file-store", stateFactory: true, namespaced: true })
export default class PureMDFileStore extends VuexModule implements Loadable {
  isLoading = false;
  markdown: string = "";

  @VuexMutation
  setMarkdown(md?: string) {
    this.markdown = isString(md) ? md! : "";
  }

  @VuexMutation
  setLoadingState(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  @VuexAction({ rawError: true })
  async onLoading(ctx: Context) {
    this.setLoadingState(true);
    try {
      const file: string = await ctx.app.$http.$get(`/static/${ctx.params.id}`);
      this.setMarkdown(file);
      this.setLoadingState(false);
    } catch (error) {
      this.setLoadingState(false);
      throw error;
    }
  }
}
