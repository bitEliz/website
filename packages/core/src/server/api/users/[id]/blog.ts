// Fetch all blogs that associated with specified user.
export default defineEventHandler((event) =>
  $fetch(
    `${useRuntimeConfig().api.__baseURL}/users/${event.context.params.id}/blog`
  )
)
