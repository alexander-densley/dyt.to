export const runtime = 'edge'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  const body = await request.json()
  const { long_link, short_link } = body
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string
  )
  const { data, error } = await supabase
    .from('links')
    .insert([
      {
        long_link,
        short_link,
      },
    ])
    .select('*')

  if (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
    })
  }

  if (!data?.length) {
    return new Response(JSON.stringify({ added: false }), {
      status: 200,
    })
  }

  return new Response(JSON.stringify({ added: true }), {
    status: 200,
  })
}
