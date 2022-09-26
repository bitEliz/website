import { Blog } from '@/models'

export * from './[id]'

export const fetchAllBlog = async (): Promise<Blog[] | null> =>
  await useApi('/api/blog')
