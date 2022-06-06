import {
  Anchor,
  Avatar,
  Button,
  Card,
  Col,
  Collapse,
  ConfigProvider,
  Image,
  List,
  Pagination,
  Popover,
  Radio,
  Rate,
  Row,
  Spin,
  Tag
} from "ant-design-vue"
import { createApp, createVNode } from "vue"
import App from "./App.vue"
import router from "./routers"
import { VBScrollspy } from "/@/directives/scollspy"
import { ImportOutlined, LoadingOutlined } from "@ant-design/icons-vue"

import "bootstrap"
import "./assets/styles/bootstrap.scss"

async function main() {
  const app = createApp(App)

  app.use(router)

  app.directive("bk-scrollspy", VBScrollspy)

  Spin.setDefaultIndicator({
    indicator: createVNode(LoadingOutlined)
  })

  app
    .use(Anchor)
    .use(Avatar)
    .use(Button)
    .use(Card)
    .use(Col)
    .use(Collapse)
    .use(ConfigProvider)
    .use(Image)
    .use(List)
    .use(Pagination)
    .use(Popover)
    .use(Radio)
    .use(Rate)
    .use(Row)
    .use(Spin)
    .use(Tag)

  app.mount("#app")
}

main()
