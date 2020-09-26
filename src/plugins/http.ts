import { Context } from "@nuxt/types";
import { Inject } from "@nuxt/types/app";
import { NuxtAxiosInstance } from "@nuxtjs/axios";

export default (ctx: Context, inject: Inject) => {
  const http = ctx.$axios.create() as NuxtAxiosInstance;

  http.onRequest((config) => {
    console.log(`${config.method?.toUpperCase()} ${config.url}`);
  });

  http.onError((error) =>
  // Rebuild error to nuxt error.
    Promise.reject({
      message: error.message,
      statusCode: error.response?.status,
    })
  );

  inject("http", http);
}
