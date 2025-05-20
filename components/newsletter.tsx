'use client'

import { useState, FormEvent } from "react"
import { Mail, AlertCircle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function Newsletter() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Entry ID from Google Form
  const FORM_ENTRY_ID = 'entry.1926558762'
  const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScUS1PYkEQgtzllxZzg2BfUjsGsXzKk8ln7ezOQ88XfUvJdPg/formResponse'
  
  // Validate email format
  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    
    // Only validate if there's something to validate
    if (newEmail.length > 0) {
      setIsValid(validateEmail(newEmail))
    } else {
      setIsValid(true) // Don't show error when field is empty
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Final validation check
    if (!validateEmail(email)) {
      setIsValid(false)
      return
    }

    setSubmitState('loading')
    
    try {
      // Create a form to submit
      // Using a hidden form approach since we cannot directly submit to Google Forms 
      // due to CORS restrictions
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = FORM_URL
      // Instead of opening in a new tab, we'll submit silently
      form.style.display = 'none'
      
      // Create the input field
      const inputField = document.createElement('input')
      inputField.name = FORM_ENTRY_ID
      inputField.value = email
      
      // Add the input to the form and the form to the document
      form.appendChild(inputField)
      document.body.appendChild(form)
      
      // Create a new iframe for the submission
      const iframe = document.createElement('iframe')
      iframe.name = 'hidden_iframe'
      iframe.style.display = 'none'
      document.body.appendChild(iframe)
      
      // Set form target to the iframe
      form.target = 'hidden_iframe'
      
      // Submit the form
      form.submit()
      
      // Clean up after a short delay
      setTimeout(() => {
        document.body.removeChild(form)
        document.body.removeChild(iframe)
      }, 1000)
      
      // Store the email in localStorage (optional - for personalization on thank you page)
      try {
        localStorage.setItem('subscribedEmail', email)
      } catch (e) {
        // Ignore localStorage errors
      }
      
      // Navigate to the thank you page
      router.push('/newsletter/thank-you')
      
    } catch (error) {
      setSubmitState('error')
      setErrorMessage('Something went wrong. Please try again later.')
      
      // Reset to idle state after a delay
      setTimeout(() => {
        setSubmitState('idle')
      }, 5000)
    }
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-16 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Never Miss an Exclusive Offer
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-lg">
              Subscribe to our newsletter and be the first to know about our luxury collections and special promotions.
            </p>
          </div>
          <div className="w-full max-w-md space-y-2">
            {submitState === 'error' ? (
              <Alert className="bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-900">
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-500" />
                <AlertDescription className="text-red-600 dark:text-red-500">
                  {errorMessage}
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setIsValid(true)
                    }}
                    className={`w-full h-12 rounded-xl border-2 ${
                      !isValid ? 'border-red-500' : 'border-purple-200 dark:border-purple-800'
                    }`}
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={submitState === 'loading'}
                  className="h-12 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl"
                >
                  {submitState === 'loading' ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Subscribing...</span>
                    </div>
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              </form>
            )}
            <p className="text-xs text-muted-foreground text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
