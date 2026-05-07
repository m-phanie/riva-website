const DEFAULT_API_URL = 'https://riva-website.onrender.com'

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL
const normalizedApiUrl = rawApiUrl.replace(/\/+$/, '')

export const buildApiUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${normalizedApiUrl}${normalizedPath}`
}

