'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WelcomeModal() {
  const [open, setOpen] = useState(false)

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleSignUp = () => {
    setOpen(false)
    // Scroll to newsletter section
    const newsletterSection = document.getElementById('newsletter-section')
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleExplore = () => {
    setOpen(false)
    // Scroll to products section
    const productsSection = document.getElementById('products-section')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-lg w-[95%] p-6 overflow-hidden">
        <button
          className="absolute top-3 right-3 z-10 rounded-full bg-white/90 dark:bg-zinc-800/90 p-2 hover:bg-white dark:hover:bg-zinc-700 transition"
          aria-label="Close welcome modal"
          onClick={() => setOpen(false)}
        >
          <X className="h-5 w-5 text-zinc-700 dark:text-zinc-200" />
        </button>
        <div className="w-full h-[180px] sm:h-[220px] relative mb-6">
          <Image
            src="/banner.png?height=400&width=800"
            alt="Welcome to Montague Crest"
            fill
            className="object-cover rounded-xl"
            priority
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Welcome to Montague Crest
          </h2>
          <p className="text-center text-muted-foreground text-sm sm:text-base">
            Your premier destination for luxury fashion and exclusive deals
          </p>
          <div className="flex flex-col gap-3">
            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-6 rounded-xl"
              onClick={handleSignUp}
            >
              Sign up for exclusive offers
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full border-2 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950/50 font-medium py-6 rounded-xl"
              onClick={handleExplore}
            >
              Explore our collection
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 