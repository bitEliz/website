export default defineEventHandler((event) =>
  $fetch(
    `${useRuntimeConfig().public.baseUrl}/users/${event.context.params.id}`,
    {
      query: getQuery(event)
    }
  )
)
