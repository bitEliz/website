import { User } from '@/models'

export * from './[id]'

export const fetchAllUsers = async (): Promise<User[] | null> =>
  await useApi('/api/users')
