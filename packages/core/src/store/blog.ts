import { fetchBlog } from '@/server/api'
import { Blog } from '@/models'

export const useBlogStore = defineStore('blog', {
  state: (): { blog: Blog } => ({
    blog: { id: 0, title: '', alias: '', excerpt: '', categories: [] }
  }),
  actions: {
    async fetch(id: string | number) {
      this.blog = await fetchBlog(id)
    }
  }
})
