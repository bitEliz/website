interface $RequestInit extends RequestInit {
  query?: Record<string, any>
}

export const useApi = async <T>(
  input: string,
  init?: $RequestInit
): Promise<T | null> => {
  let resolvedUrl = input.replace(/^\/api/, import.meta.env.BLOG_API_BASE_URL)

  let urlQuery = ''
  if (init?.query) {
    Object.keys(init.query).forEach((e) => {
      urlQuery += `&${e}=${init.query![e]}`
    })
    urlQuery = '?' + urlQuery.slice(1)
  }

  resolvedUrl += urlQuery

  try {
    const response = await fetch(resolvedUrl, init)
    if (!response.ok)
      throw 'http request failure with error: ' + response.statusText
    return await response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}
