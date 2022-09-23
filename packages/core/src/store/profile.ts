import { fetchUser } from '@/server/api/users'
import { User } from '@/models'

export const useProfileStore = defineStore('profile', {
  state: (): { profile: User } => ({
    profile: { id: 0, username: '', firstName: '', lastName: '' }
  }),
  actions: {
    async fetch() {
      this.profile = await fetchUser(import.meta.env.VITE_API_UID, {
        emb: 'edu.exp.proj.skill.sns'
      })
    }
  }
})
