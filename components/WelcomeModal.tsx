'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function WelcomeModal() {
  const [open, setOpen] = useState(true)
  const router = useRouter()

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-xl max-w-lg w-full p-6 overflow-hidden">
        <button
          className="absolute top-3 right-3 z-10 rounded-full bg-white/80 dark:bg-zinc-800/80 p-1 hover:bg-white dark:hover:bg-zinc-700 transition"
          aria-label="Close welcome modal"
          onClick={() => setOpen(false)}
        >
          <X className="h-5 w-5 text-zinc-700 dark:text-zinc-200" />
        </button>
        <div className="w-full h-[200px] md:h-[300px] relative mb-6">
          <Image
            src="/banner.png?height=400&width=800"
            alt="Featured deals"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Welcome to DealsHub</h2>
          <p className="text-center text-muted-foreground">
            Your one-stop destination for the best deals and offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="flex-1"
              onClick={handleSignUp}
            >
              Sign up to never miss a deal
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="flex-1"
              onClick={handleExplore}
            >
              Explore trending deals
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 