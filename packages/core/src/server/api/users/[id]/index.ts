import { User } from '@/models'

export * from './blog'

// Identified user with specified uid and params.
export const fetchUser = async (
  uid: number | string,
  query?: Record<string, any>
): Promise<User | null> => await useApi(`/api/users/${uid}`, { query: query })
