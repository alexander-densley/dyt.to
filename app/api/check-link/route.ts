export const fetchCache = 'force-no-store'
export const revalidate = 0

export const runtime = 'edge'

import { createClient } from '@supabase/supabase-js'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const link = searchParams.get('link') || ''
  const lowerCaseLink = link.toLowerCase()
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string
  )
  const { data, error } = await supabase
    .from('links')
    .select('*')
    .eq('short_link', lowerCaseLink)

  if (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
    })
  }

  if (!data?.length) {
    return new Response(JSON.stringify({ exists: false }), {
      status: 200,
    })
  }

  return new Response(JSON.stringify({ exists: true }), {
    status: 200,
  })
}
