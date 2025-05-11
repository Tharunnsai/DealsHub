'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto flex h-[80vh] flex-col items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Something went wrong</h2>
        <p className="mt-4 text-muted-foreground">
          We couldn't load the deals. This could be due to a network issue or a problem with our data source.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button onClick={reset} variant="default">
            Try again
          </Button>
          <Button asChild variant="outline">
            <a href="/">Go home</a>
          </Button>
        </div>
      </div>
    </div>
  )
} 