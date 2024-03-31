import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Inter as FontSans } from 'next/font/google'
import '@/styles/globals.css'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})
export const metadata: Metadata = {
  title: 'Short Links by dyt.to',
  description:
    'dyt.to is a short link service that allows you to create and share short links with ease.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <main>{children}</main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
