import { Blog } from '@/models'

// Fetch blog with id or alias.
async function fetchBlog(
  id: number | string,
  query?: Record<string, any>
): Promise<Blog | null> {
  return await $fetch(`${useRuntimeConfig().public.baseUrl}/blog/${id}`, {
    query: query
  })
}

export default defineEventHandler((event) =>
  fetchBlog(event.context.params.id, getQuery(event))
)
