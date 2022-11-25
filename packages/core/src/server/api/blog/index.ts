import { Blog } from '@/models'

async function fetchAllBlog(): Promise<Blog[] | null> {
  return await $fetch(useRuntimeConfig().public.baseUrl + '/blog')
}

export default defineEventHandler(() => fetchAllBlog())
