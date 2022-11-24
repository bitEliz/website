import { Blog } from '@/models'

async function fetchAllBlog(): Promise<Blog[] | null> {
  return await $fetch(`${useRuntimeConfig().api.__baseURL}/blog`)
}

export default defineEventHandler(() => fetchAllBlog())
