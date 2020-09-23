import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import BlogListStore from "~/store/blog-list-store";
import ResumeStore from "~/store/resume-store";
import PureMDFileStore from "~/store/pure-md-file-store";
import BlogStore from "~/store/blog-store";

let resumeStore: ResumeStore;
let pureMDFileStore: PureMDFileStore;
let blogListStore: BlogListStore;
let blogStore: BlogStore;

function typedStore(store: Store<any>): void {
  resumeStore = getModule(ResumeStore, store);
  pureMDFileStore = getModule(PureMDFileStore, store);
  blogListStore = getModule(BlogListStore, store);
  blogStore = getModule(BlogStore, store);
}

export { typedStore, resumeStore, pureMDFileStore, blogListStore, blogStore };
