'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CopyButton } from '@/components/copy-button'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { isValidUrl, checkLink } from '@/lib/utils'

export default function Home() {
  const [longLink, setLongLink] = useState('')
  const [shortLink, setShortLink] = useState('')
  const [loading, setLoading] = useState(false)

  async function generateLink() {
    const res = await fetch('/api/generate-link', {
      cache: 'no-store',
    })
    const { randomString } = await res.json()
    setShortLink(randomString)
  }

  async function addLink() {
    setLoading(true)
    const exists = await checkLink(shortLink)
    if (exists) {
      toast.error('This short link already exists!')
      setLoading(false)
      return
    }
    if (longLink.length === 0 || shortLink.length === 0) {
      toast.error('Links cannot be empty!')
      setLoading(false)
      return
    }

    const res = await fetch('/api/create-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        long_link: longLink,
        short_link: shortLink,
      }),
    })
    const { added } = await res.json()
    if (added) {
      toast.success(`Link successfully created!`)
    } else {
      toast.error('Link already exists!')
    }
    setLoading(false)
  }

  const handleLongLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value

    if (inputValue.startsWith('https://')) {
      inputValue = inputValue.slice(8)
    }

    setLongLink(inputValue)
  }
  const handleShortLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShortLink(e.target.value)
  }

  return (
    <div className='flex min-h-screen flex-col items-center space-y-6 md:space-y-12'>
      <h2 className='mt-12 scroll-m-20 text-center text-4xl font-extrabold tracking-tight md:mt-24 lg:text-5xl'>
        Create unique short links with
      </h2>
      <h1 className='scroll-m-20 text-5xl font-extrabold italic tracking-tight underline lg:text-6xl'>
        dyt.to
      </h1>

      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Create a short link with dyt.to</CardTitle>
          <CardDescription>
            Just paste your long link and get a shortened link instantly!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='link'>Your link</Label>
              <div className='flex items-center gap-1'>
                <p className='flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'>
                  https://
                </p>
                <Input
                  id='link'
                  placeholder='example.com'
                  value={longLink}
                  onChange={handleLongLinkChange}
                />
              </div>

              {!isValidUrl('https://' + longLink) && longLink.length > 0 && (
                <p className='text-sm text-muted-foreground'>
                  Please enter a valid URL.
                </p>
              )}
              <Label htmlFor='short_link'>Shortened link</Label>
              <div className='flex items-center gap-1'>
                <p className='flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'>
                  dyt.to/
                </p>
                <Input
                  id='short_link'
                  placeholder='short link'
                  value={shortLink}
                  onChange={handleShortLinkChange}
                />
                <CopyButton value={shortLink} />
              </div>
              <Button
                onClick={generateLink}
                variant='link'
                className='p-2 text-sm text-muted-foreground'
              >
                generate random link
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button
            variant='outline'
            onClick={() => {
              setLongLink('')
              setShortLink('')
            }}
          >
            Clear
          </Button>
          <Button onClick={addLink} disabled={loading}>
            {loading ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              'Create link'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
