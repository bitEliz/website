import { User } from '@/models'

async function fetchResume(uid: number | string) {
  const response = await $fetch(`/api/users/${uid}`, {
    query: { emb: 'edu.exp.proj.skill.sns' }
  })

  return response
}

export default defineEventHandler((event) => {
  return fetchResume(useRuntimeConfig().public.__uid)
})
