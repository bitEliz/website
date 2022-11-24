export default defineEventHandler(async () => {
  const ret = await $fetch('/api/blog')

  const latestBlog = ret
  const featuredBlog = ret
  const trunkedBlog = ret

  return {
    latestBlog,
    featuredBlog,
    trunkedBlog
  }
})
