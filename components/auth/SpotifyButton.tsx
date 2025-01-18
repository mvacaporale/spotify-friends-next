'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ArrowRight } from "lucide-react"

export default function SpotifyButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const signInWithSpotify = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'spotify',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: "user-read-email user-top-read playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-read user-library-read",
        },
      })

      if (error) throw error
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <button
        onClick={signInWithSpotify}
        disabled={isLoading}
        className="bg-emerald-500 text-neutral-100 px-8 py-3 rounded-full font-medium hover:bg-emerald-600 transition-colors inline-flex items-center gap-2 mb-6"
      >
        {isLoading ? (
          <span>Connecting...</span>
        ) : (
          <>
            Connect with Friends
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </div>
  )
}