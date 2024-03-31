export const fetchCache = 'force-no-store'
export const revalidate = 0

export const runtime = 'edge'

import { createClient } from '@supabase/supabase-js'
export async function GET(request: Request) {
  const values =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string
  )

  while (true) {
    const randomString = Array.from({ length: 5 })
      .map(() => values[Math.floor(Math.random() * values.length)])
      .join('')

    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('short_link', randomString.toLowerCase())

    if (error) {
      return new Response(JSON.stringify(error), {
        status: 500,
      })
    }

    if (!data?.length) {
      return new Response(JSON.stringify({ randomString }), {
        status: 200,
      })
    }
  }
}
