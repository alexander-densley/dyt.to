import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidUrl(url: string) {
  try {
    new URL(url)
    return true
  } catch (err) {
    return false
  }
}

export async function checkLink(link: string) {
  const res = await fetch('/api/check-link?link=' + link, { cache: 'no-store' })
  const data = await res.json()
  return data.exists
}
