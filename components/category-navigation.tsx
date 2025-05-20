'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export function CategoryNavigation() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab') || 'all'
  
  const isActive = (tab: string) => {
    if (tab === 'all' && !searchParams.get('tab')) {
      return true
    }
    return currentTab === tab
  }

  return (
    <nav className="hidden gap-6 md:flex">
      <Link
        href="/"
        className={`flex items-center text-sm font-medium hover:text-foreground ${
          isActive('all') ? 'text-foreground' : 'text-muted-foreground'
        }`}
      >
        Trending Deals
      </Link>
      <Link
        href="/?tab=amazon"
        className={`flex items-center text-sm font-medium hover:text-foreground ${
          isActive('amazon') ? 'text-foreground' : 'text-muted-foreground'
        }`}
      >
        Amazon
      </Link>
      <Link
        href="/?tab=flipkart"
        className={`flex items-center text-sm font-medium hover:text-foreground ${
          isActive('flipkart') ? 'text-foreground' : 'text-muted-foreground'
        }`}
      >
        Flipkart
      </Link>
      <Link
        href="/?tab=electronics"
        className={`flex items-center text-sm font-medium hover:text-foreground ${
          isActive('electronics') ? 'text-foreground' : 'text-muted-foreground'
        }`}
      >
        Electronics
      </Link>
      <Link
        href="/?tab=fashion"
        className={`flex items-center text-sm font-medium hover:text-foreground ${
          isActive('fashion') ? 'text-foreground' : 'text-muted-foreground'
        }`}
      >
        Fashion
      </Link>
    </nav>
  )
} 