import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import ApiStore from "~/store/api-store";
import BlogStore from "~/store/blog-store";
import BlogListStore from "~/store/blog-list-store";
import PureMDFileStore from "~/store/pure-md-file-store";
import PureMDResumeStore from "~/store/pure-md-resume-store";

let apiStore: ApiStore;
let blogStore: BlogStore;
let blogListStore: BlogListStore;
let pureMDFileStore: PureMDFileStore;
let pureMDResumeStore: PureMDResumeStore;

function typedStore(store: Store<any>): void {
  pureMDFileStore = getModule(PureMDFileStore, store);
  blogListStore = getModule(BlogListStore, store);
  blogStore = getModule(BlogStore, store);
  apiStore = getModule(ApiStore, store);
  pureMDResumeStore = getModule(PureMDResumeStore, store);
}

export {
  typedStore,
  apiStore,
  blogListStore,
  blogStore,
  pureMDFileStore,
  pureMDResumeStore
};
