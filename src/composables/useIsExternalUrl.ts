export function useIsExternalUrl() {
  const isExternalUrl = (url: string): boolean => {
    return /^https?:\/\//i.test(url)
  }

  return {
    isExternalUrl
  }
}
