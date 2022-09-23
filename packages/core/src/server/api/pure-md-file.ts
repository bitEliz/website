// Fetch md file with specified filename.
export const fetchMDFile = async (filename: string): Promise<string> =>
  await useApi(`/api/static/${filename}.md`)
