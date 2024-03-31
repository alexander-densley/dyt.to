export const fetchCache = 'force-no-store'
export const revalidate = 0
export const runtime = 'edge'

import { createClient } from '@supabase/supabase-js'

const generateRandomString = (length: number): string => {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return Array.from({ length })
    .map(() => characters[Math.floor(Math.random() * characters.length)])
    .join('')
}

export async function GET(request: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string
  )

  let retries = 0
  const maxRetries = 5

  while (retries < maxRetries) {
    const randomString = generateRandomString(5)

    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('short_link', randomString.toLowerCase())

    if (error) {
      console.error('Error fetching data from Supabase:', error)
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
      })
    }

    if (!data?.length) {
      return new Response(JSON.stringify({ randomString }), {
        status: 200,
      })
    }

    retries++
  }

  return new Response(
    JSON.stringify({ error: 'Unable to generate a unique short link' }),
    {
      status: 500,
    }
  )
}
