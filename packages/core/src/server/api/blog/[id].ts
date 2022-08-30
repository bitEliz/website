import { Blog } from '@/types/fluent'
import { resolveApiUrl } from '@/utils'

export default defineEventHandler((event) => {
  return $fetch(resolveApiUrl(event.req.url)) as Promise<Blog>
})
