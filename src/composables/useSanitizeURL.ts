export function useSanitizeURL(url: string): string {
  try {
    const parsed = new URL(url, window.location.origin)

    const isSafeProtocol = ['http:', 'https:'].includes(parsed.protocol)

    if (!isSafeProtocol) {
      return '#'
    }

    return parsed.href
  } catch {
    return '#'
  }
}
