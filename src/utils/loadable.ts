import { Context } from "@nuxt/types";

export interface Loadable {
  isLoading: boolean;

  setLoadingState(isLoading: boolean): void;

  onLoading(context?: Context): Promise<void>;
}
