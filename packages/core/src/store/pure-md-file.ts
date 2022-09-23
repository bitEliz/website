import { fetchMDFile } from '@/server/api'

export const usePureMDFileStore = defineStore('pure_md_file', {
  state: (): { data: string } => ({ data: '' }),
  actions: {
    async fetch(id: string) {
      this.data = await fetchMDFile(id)
    }
  }
})
