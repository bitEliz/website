export default defineEventHandler((event) => {
  const __baseURL = useRuntimeConfig().api.__baseURL
  return $fetch(`${__baseURL}${event.req.url.replace(/^\/api/, "")}`)
})
