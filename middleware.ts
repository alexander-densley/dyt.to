import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
)
export default authMiddleware({
  afterAuth: async (auth, req, evt) => {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }
    const lowerCaseLink = req.nextUrl.pathname.slice(1).toLowerCase()
    if (lowerCaseLink.length > 0) {
      const { data, error } = await supabase
        .from('links')
        .select('long_link, clicks')
        .eq('short_link', lowerCaseLink)

      if (error) {
        return new NextResponse(JSON.stringify(error), {
          status: 500,
        })
      }
      if (data?.length && data[0].long_link) {
        await supabase
          .from('links')
          .update({ clicks: data[0].clicks + 1 })
          .eq('short_link', lowerCaseLink)
        return NextResponse.redirect(new URL(data[0].long_link))
      } else {
        return NextResponse.next()
      }
    }
    return NextResponse.next()
  },
  publicRoutes: ['/((?!account).*)'],
})
export const config = {
  matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
