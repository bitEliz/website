import { defineComponent } from "vue"
import { useRoute } from "vue-router"
import Markup from "../../../components/markup"
import Loading from "../../../components/Loading.vue"
import { useFetch } from "../../../composables"

const PureMDFile = defineComponent({
  setup() {
    const route = useRoute()
    const path = route.path.startsWith("/static") ? route.path : `/static${route.path}`
    const { result, isLoading } = useFetch(`/api/${path}.md`)

    return () =>
      isLoading.value ? (
        <Loading />
      ) : (
        <div id="__file">
          <main>
            <Markup src={result.value}></Markup>
          </main>
        </div>
      )
  }
})

export default PureMDFile
