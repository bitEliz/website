export async function useApi<T>(
  url: string,
  params?: Record<string, any>
): Promise<T> {
  let resolvedUrl = url.replace(/^\/api/, import.meta.env.VITE_API_BASE_URL)

  let queries = ''
  if (params) {
    Object.keys(params).forEach((e) => {
      queries += `&${e}=${params[e]}`
    })
    queries = '?' + queries.slice(1)
  }

  resolvedUrl += queries

  const response = await fetch(resolvedUrl)
  return await response.json()
}
