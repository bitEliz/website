import { fetchUser } from '@/server/api'
import { User } from '@/models'

export const useProfileStore = defineStore('profile', {
  state: (): { data: User } => ({
    data: { id: 0, username: '', firstName: '', lastName: '' }
  }),
  actions: {
    async fetch() {
      const response = await fetchUser(import.meta.env.BLOG_API_UID, {
        emb: 'edu.exp.proj.skill.sns'
      })
      if (response) {
        this.data = response
      }
    }
  }
})
