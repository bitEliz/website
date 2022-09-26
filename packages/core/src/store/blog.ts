import { fetchBlog } from '@/server/api'
import { Blog } from '@/models'

export const useBlogStore = defineStore('blog', {
  state: (): { data: Blog } => ({
    data: { id: 0, title: '', alias: '', excerpt: '', categories: [] }
  }),
  actions: {
    async fetch(id: string | number) {
      const response = await fetchBlog(id)
      if (response) {
        this.data = response
      }
    }
  }
})
