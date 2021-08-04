import {
  Anchor,
  Avatar,
  Button,
  Card,
  Col,
  ConfigProvider,
  Image,
  List,
  Pagination,
  Popover,
  Radio,
  Rate,
  Row,
  Tag
} from "ant-design-vue"
import { createApp } from "vue"
import App from "./App.vue"
import router from "./routers"

async function main() {
  const app = createApp(App)

  app.use(router)

  app
    .use(Anchor)
    .use(Avatar)
    .use(Button)
    .use(Card)
    .use(Col)
    .use(ConfigProvider)
    .use(Image)
    .use(List)
    .use(Pagination)
    .use(Popover)
    .use(Radio)
    .use(Rate)
    .use(Row)
    .use(Tag)

  app.mount("#app")
}

main()
