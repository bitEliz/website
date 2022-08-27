export default defineEventHandler((event) => {
  const {
    api: { __baseURL }
  } = useRuntimeConfig()

  return $fetch(`${__baseURL}/${event.req.url.replace(/^\/api/, "")}`)
})
