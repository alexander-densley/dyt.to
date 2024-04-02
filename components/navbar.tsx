'use client'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function NavBar() {
  return (
    <div className='grid h-14 w-full grid-cols-2 items-center  px-4'>
      <Link href='/' className='text-xl font-semibold'>
        dyt.to
      </Link>
      {/* <NavigationMenu className='mx-auto'>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href='/lexi' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                How it works
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='/subtract' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>{' '}
        </NavigationMenuList>
      </NavigationMenu> */}
      <div className='ml-auto flex items-center gap-2'>
        <Link
          href='/account'
          className={cn(buttonVariants({ variant: 'default' }), 'h-8 p-2.5')}
        >
          My links
        </Link>

        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  )
}
