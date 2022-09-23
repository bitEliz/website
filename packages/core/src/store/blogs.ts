import { fetchUserBlog } from '@/server/api/users'
import { BlogGroup } from '@/models'

export const useBlogsStore = defineStore('blogs', {
  state: (): { blog: BlogGroup } => ({
    blog: {}
  }),
  actions: {
    async fetch() {
      const response = await fetchUserBlog(import.meta.env.VITE_API_UID)
      this.blog = {
        featuredBlog: response,
        latestBlog: response,
        trunkedBlog: response
      }
    }
  }
})
