import { User } from '@/types/fluent'
import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => {
    return {
      profile: { id: 0, username: '', firstName: '', lastName: '' } as User
    }
  },
  actions: {
    async fetch() {
      const response = await fetch('https://api.ttli.xyz/users/paul/resume')
      this.profile = (await response.json()) as User
    }
  }
})
