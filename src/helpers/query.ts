export const parseQueryFilter = <T extends object = Record<string, any>>(
 filterString: string | undefined
): T => {
 try {
  if (!filterString) {
   return {} as T
  }

  const filtered = JSON.parse(decodeURIComponent(filterString))
  return Object.keys(filtered).length === 0 ? ({} as T) : (filtered as T)
 } catch (error: any) {
  throw new Error('Error parsing query filter')
 }
}

export const setQueryFilter = <T extends object = Record<string, any>>(
 filter: T
): string => {
 try {
  return encodeURIComponent(JSON.stringify(filter))
 } catch (error: any) {
  throw new Error('Error setting query filter')
 }
}
