'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"

export default function WelcomeModal() {
  const [open, setOpen] = useState(true)

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

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-xl max-w-lg w-full p-0 overflow-hidden">
        <button
          className="absolute top-3 right-3 z-10 rounded-full bg-white/80 dark:bg-zinc-800/80 p-1 hover:bg-white dark:hover:bg-zinc-700 transition"
          aria-label="Close welcome modal"
          onClick={() => setOpen(false)}
        >
          <X className="h-5 w-5 text-zinc-700 dark:text-zinc-200" />
        </button>
        <div className="w-full h-[300px] md:h-[400px] relative">
          <Image
            src="/banner.png?height=400&width=800"
            alt="Featured deals"
            fill
            className="object-cover rounded-t-xl"
            priority
          />
        </div>
      </div>
    </div>
  )
} 