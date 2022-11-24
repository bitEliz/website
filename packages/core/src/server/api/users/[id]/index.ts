export default defineEventHandler((event) =>
  $fetch(
    `${useRuntimeConfig().api.__baseURL}/users/${event.context.params.id}`,
    {
      query: getQuery(event)
    }
  )
)
