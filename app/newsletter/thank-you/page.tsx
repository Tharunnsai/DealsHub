'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle, ArrowLeft, Tag, Bell, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NewsletterThankYou() {
  const [email, setEmail] = useState<string>("")
  
  useEffect(() => {
    // Get email from localStorage if available
    try {
      const savedEmail = localStorage.getItem('subscribedEmail')
      if (savedEmail) {
        setEmail(savedEmail)
      }
    } catch (e) {
      // Ignore localStorage errors
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32 flex flex-col items-center">
      <div className="max-w-3xl w-full text-center space-y-6">
        {/* Success Icon */}
        <div className="mx-auto bg-green-100 dark:bg-green-900/30 h-24 w-24 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-500" />
        </div>
        
        {/* Title and Subtitle */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Thanks for Subscribing!</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {email ? (
            <>We've added <span className="font-medium">{email}</span> to our mailing list.</>
          ) : (
            <>You're now part of our deals community.</>
          )}
          {' '}We'll send you the best offers and exclusive discounts straight to your inbox.
        </p>
        
        {/* What to Expect Section */}
        <div className="mt-12 bg-muted p-6 rounded-lg text-left">
          <h2 className="text-xl font-semibold mb-4">What to Expect</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <Tag className="h-5 w-5 mr-3 mt-0.5 text-primary" />
              <div>
                <span className="font-medium">Daily Deal Alerts</span>
                <p className="text-muted-foreground">We'll send you the best deals every day, curated specifically for you.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Bell className="h-5 w-5 mr-3 mt-0.5 text-primary" />
              <div>
                <span className="font-medium">Flash Sale Notifications</span>
                <p className="text-muted-foreground">Be the first to know about time-limited offers from top retailers.</p>
              </div>
            </li>
            <li className="flex items-start">
              <ShoppingBag className="h-5 w-5 mr-3 mt-0.5 text-primary" />
              <div>
                <span className="font-medium">Exclusive Discounts</span>
                <p className="text-muted-foreground">Get access to subscriber-only deals and special promotions.</p>
              </div>
            </li>
          </ul>
        </div>
        
        {/* Email Verification Note */}
        <div className="mt-8 text-muted-foreground">
          <p>Please check your inbox to confirm your subscription. If you don't see it, check your spam folder.</p>
        </div>
        
        {/* Return to Homepage Button */}
        <div className="mt-8">
          <Button asChild>
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Homepage
            </Link>
          </Button>
        </div>
        
        {/* Privacy Reminder */}
        <p className="text-xs text-muted-foreground mt-8">
          We respect your privacy and will never share your email with third parties. You can unsubscribe at any time.
        </p>
      </div>
    </div>
  )
} 