import { Component } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import PureMDFileView from "./static/_id.vue";
import { pureMDFileStore } from "~/store";

@Component
export default class PureMDResumeView extends PureMDFileView {
  async asyncData(context: Context) {
    try {
      context.params.id = "pure-md-resume.md";
      await pureMDFileStore.onLoading(context);
    } catch (error) {
      context.error(error);
    }
  }
}
