import { createApp } from "vue"
import App from "./App.vue"
import router from "./routers"

import "bootstrap/scss/bootstrap.scss"
import "bootstrap"

async function main() {
  const app = createApp(App)

  app.use(router)

  app.mount("#app")
}

main()
