import { fetchUserBlog } from '@/server/api'
import { BlogGroup } from '@/models'

export const useBlogGalleryStore = defineStore('blog_gallery', {
  state: (): { data: BlogGroup } => ({
    data: {}
  }),
  actions: {
    async fetch() {
      const response = await fetchUserBlog(import.meta.env.BLOG_API_UID)
      this.blog = {
        featuredBlog: response,
        latestBlog: response,
        trunkedBlog: response
      }
    }
  }
})
