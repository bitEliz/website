const __baseUrl = useRuntimeConfig().api.__baseURL

export const resolveApiUrl = (original: string): string =>
  `${__baseUrl}${original.replace(/^\/api/, '')}`
