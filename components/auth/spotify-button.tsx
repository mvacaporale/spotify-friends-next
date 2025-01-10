'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function SpotifyButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
      // Type guard for error handling
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
        className="flex items-center justify-center gap-2 bg-[#1DB954] hover:bg-[#1ed760] text-white font-bold py-2 px-6 rounded-full transition-colors disabled:opacity-50"
      >
        {isLoading ? (
          <span>Connecting...</span>
        ) : (
          <>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.371-.721.49-1.101.241-3.021-1.85-6.82-2.27-11.3-1.24-.418.1-.851-.16-.95-.58-.1-.42.16-.851.58-.951 4.9-1.12 9.1-.63 12.5 1.38.38.23.489.721.241 1.1zm1.47-3.27c-.301.45-.921.6-1.381.29-3.45-2.12-8.7-2.73-12.791-1.49-.51.17-1.061-.11-1.23-.63-.17-.51.11-1.061.63-1.23 4.671-1.42 10.471-.72 14.461 1.68.45.3.6.93.29 1.38zm.129-3.42c-4.15-2.461-11.001-2.69-14.951-1.49-.61.2-1.25-.12-1.451-.73-.2-.61.12-1.25.73-1.45 4.561-1.38 12.131-1.12 16.891 1.72.57.34.761 1.08.42 1.66-.34.57-1.08.76-1.66.42z"/>
            </svg>
            <span>Continue with Spotify</span>
          </>
        )}
      </button>
    </div>
  )
}