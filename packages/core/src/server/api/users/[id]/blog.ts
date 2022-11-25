// Fetch all blogs that associated with specified user.
export default defineEventHandler((event) =>
  $fetch(
    `${useRuntimeConfig().public.baseUrl}/users/${event.context.params.id}/blog`
  )
)
