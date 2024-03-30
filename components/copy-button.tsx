'use client'

import * as React from 'react'
import { Copy, Check } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string
  src?: string
}

export async function copyToClipboardWithMeta(value: string) {
  navigator.clipboard.writeText(`https://dyt.to/${value}`)
}

export function CopyButton({ value, className }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <Button
      size='icon'
      variant='outline'
      className={cn('relative z-10 w-14', className)}
      onClick={(e) => {
        e.preventDefault()
        copyToClipboardWithMeta(value)
        setHasCopied(true)
        toast.success(`Link successfully copied!`)
      }}
    >
      <span className='sr-only'>Copy</span>
      {hasCopied ? (
        <Check className='h-3 w-3 hover:bg-white' color='black' />
      ) : (
        <Copy className='h-3 w-3 hover:bg-white' color='black' />
      )}
    </Button>
  )
}
