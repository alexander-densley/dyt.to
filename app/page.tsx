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

export default function Home() {
	const [longLink, setLongLink] = useState('')
	const [shortLink, setShortLink] = useState('')
	const [exists, setExists] = useState(false)
	const [added, setAdded] = useState(false)

	function isValidUrl(url: string) {
		try {
			new URL(url)
			return true
		} catch (err) {
			return false
		}
	}

	async function addLink() {
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
		const data = await res.json()
		setAdded(data.added)
	}

	async function checkLink(link: string) {
		const res = await fetch('/api/check-link?link=' + link, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const data = await res.json()
		setExists(data.exists)
	}

	const handleLongLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLongLink(e.target.value)
		isValidUrl(e.target.value)
	}
	const handleShortLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setShortLink(e.target.value)
		checkLink(e.target.value)
	}

	return (
		<div className='min-h-screen flex flex-col items-center justify-center gap-4'>
			<Card className='w-[350px]'>
				<CardHeader>
					<CardTitle>Create a short with with dyt.to</CardTitle>
					<CardDescription>
						Create a short link with dyt.to and share it with your friends.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className='grid w-full items-center gap-4'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='link'>Your link</Label>
								<Input
									id='link'
									placeholder='https://example.com'
									value={longLink}
									onChange={handleLongLinkChange}
								/>
								{!isValidUrl(longLink) && longLink.length > 0 && (
									<p className='text-sm text-muted-foreground'>
										Please enter a valid URL.
									</p>
								)}
								<Label htmlFor='short_link'>Shortened link</Label>
								<div className='flex items-center gap-1'>
									<p className='flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'>
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
								<p className='text-sm text-muted-foreground'>
									{shortLink.length > 0 && exists
										? 'This short link already exists.'
										: ''}
								</p>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className='flex justify-between'>
					<Button variant='outline'>Cancel</Button>
					<Button onClick={addLink}>Create link</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
