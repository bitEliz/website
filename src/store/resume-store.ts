import { Context } from "@nuxt/types";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { User } from "~/models/resume";
import { isArray } from "~/utils/inspect";
import { Loadable } from "~/utils/loadable";

@Module({ name: "resume-store", stateFactory: true, namespaced: true })
export default class ResumeStore extends VuexModule implements Loadable {
  private _user?: User;
  isLoading = false;

  get list(): Array<object> {
    return _fillList(this._user);
  }

  get formattedName(): string {
    const lastName = this._user?.lastName ? this._user.lastName : "";
    const firstName = this._user?.firstName ? this._user.firstName : "";
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
      let user: User = await context.app.$http.$get(
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

const _fillList = (user?: User) => {
  let result = Array<object>();
  if (user != null) {
    result.push({
      id: "profile",
      title: "个人资料",
      profile: user,
    });

    if (isArray(user?.projects) && user.projects!.length) {
      result.push({
        id: "projects",
        title: "精选项目",
        projects: user.projects,
      });
    }

    let exp = [];
    if (isArray(user?.workExps) && user.workExps!.length) {
      exp.push({
        id: "work",
        title: "职业经历",
        workExps: user.workExps,
      });
    }

    if (isArray(user?.eduExps) && user.eduExps!.length) {
      exp.push({
        id: "education",
        title: "教育经历",
        eduExps: user.eduExps,
      });
    }

    if (exp.length) {
      result.push({
        id: "experiance",
        title: "经验",
        exp: exp,
      });
    }

    if (isArray(user?.skill?.professional) && user.skill!.professional!.length) {
      result.push({
        id: "skills",
        title: "专业技能",
        skills: user.skill!.professional,
      });
    }
  }
  return result;
};
