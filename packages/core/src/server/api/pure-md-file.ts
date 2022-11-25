// Fetch md file with specified filename.
export const fetchMDFile = async (filename: string): Promise<string> => {
  try {
    const response = await $fetch(
      `${useRuntimeConfig().public.baseUrl}/static/${filename}.md`
    )
    return response as string
  } catch (error) {
    console.error(error)
    return ''
  }
}

export default defineEventHandler(() => fetchMDFile('pure-md-resume'))
