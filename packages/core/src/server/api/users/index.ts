import { User } from '@/models'

export * from './[id]'

export const fetchAllUsers = async (): Promise<[User]> =>
  await useApi('/api/users')
