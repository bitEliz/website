import { Blog } from '@/models'

// Fetch blog with id or alias.
export const fetchBlog = async (
  id: number | string,
  params?: Record<string, any>
): Promise<Blog> => await useApi(`/api/blog/${id}`, params)
