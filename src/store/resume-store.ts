import { Context } from "@nuxt/types";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { ListGroup, MDL_ID } from "~/models/list-group";
import { Project, User } from "~/models/resume";
import { Loadable } from "~/utils/loadable";

@Module({ name: "resume-store", stateFactory: true, namespaced: true })
export default class ResumeStore extends VuexModule implements Loadable {
  private _user?: User;
  isLoading = false;

  get list(): Array<ListGroup<any>> {
    return _fillList(this._user);
  }

  get formattedTitle(): string {
    return this._user?.username ? this._user.username.toUpperCase() : "";
  }

  get formattedName(): string {
    const lastName = this._user?.lastName ?? "";
    const firstName = this._user?.firstName ?? "";
    return lastName + firstName;
  }

  @Mutation
  setUser(user?: User) {
    this._user = user;
  }

  @Mutation
  setLoadingState(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  @Action({ rawError: true })
  async onLoading(context: Context) {
    this.setLoadingState(true);
    try {
      const user: User = await context.app.$http.$get(
        `/users/${context.$config.uid}/resume`
      );
      this.setUser(user);
      this.setLoadingState(false);
    } catch (error) {
      this.setLoadingState(false);
      throw error;
    }
  }
}

const PROJ_VISIBILITY_PUBLIC = "public";

const GITHUB = "github.com";

const _fillList = (arg?: User) => {
  const result: ListGroup<any>[] = [];

  if (!arg) {
    return result;
  }

  const user = arg!;

  result.push(new ListGroup(MDL_ID.PROFILE, "简介", [arg]));

  // Filter visible proj.
  const githubList: Project[] = [];
  const otherList: Project[] = [];
  user.projects?.forEach((proj) => {
    // Only `proj.visibility` marked as `public` can pass filter.
    if (proj.visibility === PROJ_VISIBILITY_PUBLIC) {
      // All github repo project are marked as open source proj.
      if (proj.trackViewUrl && proj.trackViewUrl?.indexOf(GITHUB) !== -1) {
        githubList.push(proj);
      } else {
        otherList.push(proj);
      }
    }
  });

  const proj: ListGroup<Project>[] = [];

  if (githubList.length) {
    proj.push(new ListGroup(MDL_ID.DEFAULT, "开源项目", githubList));
  }

  if (otherList.length) {
    proj.push(new ListGroup(MDL_ID.DEFAULT, "精选项目", otherList));
  }

  if (proj.length) {
    result.push(new ListGroup(MDL_ID.PROJECT, "项目", proj));
  }

  const exp: ListGroup<any>[] = [];
  if (user.workExps?.length) {
    exp.push(new ListGroup(MDL_ID.EXPERIENCE, "工作经历", user.workExps));
  }

  if (user.eduExps?.length) {
    exp.push(new ListGroup(MDL_ID.EDUCATIONAL, "教育经历", user.eduExps));
  }

  if (exp.length) {
    result.push(new ListGroup(MDL_ID.EXPERIENCE, "经历", exp));
  }

  if (user.skill?.professional?.length) {
    result.push(new ListGroup(MDL_ID.SKILL, "技能", user.skill!.professional));
  }
  return result;
};
