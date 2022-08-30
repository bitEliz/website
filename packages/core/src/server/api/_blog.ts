export default defineEventHandler(() => {
  const __uid = useRuntimeConfig().public.__uid
  return $fetch(`/api/users/${__uid}/blog`)
})
