import { Blog } from '@/models'

export * from './[id]'

export const fetchAllBlog = async (): Promise<[Blog]> =>
  await useApi('/api/blog')
