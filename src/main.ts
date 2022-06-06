import { createApp } from "vue"
import App from "./App.vue"
import router from "./routers"
import { VBScrollspy } from "/@/directives/scollspy"

import "./assets/styles/bootstrap.scss"
import "bootstrap"

async function main() {
  const app = createApp(App)

  app.use(router)

  app.directive("bk-scrollspy", VBScrollspy)

  app.mount("#app")
}

main()
