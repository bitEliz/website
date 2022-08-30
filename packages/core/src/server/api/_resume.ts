import { User } from '@/types/fluent'

export default defineEventHandler(() => {
  const __uid = useRuntimeConfig().public.__uid
  return $fetch(
    `/api/users/${__uid}?emb=edu.exp.proj.skill.sns`
  ) as Promise<User>
})
