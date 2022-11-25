import { User } from '@/models'

async function fetchAllUsers(): Promise<User[] | null> {
  return await $fetch(useRuntimeConfig().public.baseUrl + '/users')
}

export default defineEventHandler(() => fetchAllUsers())
