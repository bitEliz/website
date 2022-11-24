import { User } from '@/models'

async function fetchAllUsers(): Promise<User[] | null> {
  return await $fetch(`${useRuntimeConfig().api.__baseURL}/users`)
}

export default defineEventHandler(() => fetchAllUsers())
