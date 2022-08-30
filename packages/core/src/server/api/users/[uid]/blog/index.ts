import { resolveApiUrl } from '@/utils'
import { BlogGroup } from '@/types/fluent'

export default defineEventHandler(async (event) => {
  const ret = await $fetch(resolveApiUrl(event.req.url))
  return {
    latestBlog: ret,
    featuredBlog: ret,
    trunkedBlog: ret
  } as BlogGroup
})
