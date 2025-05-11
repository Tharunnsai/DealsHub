'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SearchBoxProps {
  defaultValue?: string
}

export function SearchBox({ defaultValue = '' }: SearchBoxProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(defaultValue)
  
  // Create a debounced search function
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      // Create a new URLSearchParams instance
      const params = new URLSearchParams(searchParams.toString())
      
      // Update or remove the 'q' parameter based on the search term
      if (term) {
        params.set('q', term)
      } else {
        params.delete('q')
      }
      
      // Keep the current tab parameter if it exists
      // const tab = searchParams.get('tab')
      // if (tab) params.set('tab', tab)
      
      // Generate the new URL with updated search parameters
      const queryString = params.toString()
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname
      
      // Navigate to the new URL
      router.push(newUrl)
    }, 500),
    [router, pathname, searchParams]
  )
  
  // When the user types in the search box
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value
    setSearchTerm(newTerm)
    debouncedSearch(newTerm)
  }
  
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search deals..."
        className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[400px]"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  )
}

// Debounce function to prevent too many searches while typing
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
      timeout = null
    }, wait)
  }
} 