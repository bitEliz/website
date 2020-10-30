<script lang="ts">
import { Component } from "nuxt-property-decorator";
import { pureMDResumeStore } from "~/store";
import { Context } from '@nuxt/types';
import PureMDFileView from "~/views/static/_id.vue";

@Component
export default class PureMDResumeView extends PureMDFileView {
  get markdown(): string {
    return pureMDResumeStore.markdown;
  }

  async asyncData(context: Context) {
    try {
      await pureMDResumeStore.onLoading(context);
    } catch (error) {
      context.error(error);
    }
  }
}
</script>