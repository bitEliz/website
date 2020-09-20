declare var process: {
  env: {
    VUE_APP_BASE_URL: string;
  };
};

export const baseURL: string = process.env.VUE_APP_BASE_URL;
export const routerMode = "history";
