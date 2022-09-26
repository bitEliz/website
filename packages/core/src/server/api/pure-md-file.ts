// Fetch md file with specified filename.
export const fetchMDFile = async (filename: string): Promise<string> => {
  try {
    const response = await fetch(
      `${import.meta.env.BLOG_API_BASE_URL}/static/${filename}.md`
    )
    return await response.text()
  } catch (error) {
    console.error(error)
    return ''
  }
}
