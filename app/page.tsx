import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SpotifyButton from '@/components/auth/spotify-button'

export default async function Home() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen flex-col py-12 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="w-10 h-10 bg-[#1DB954] rounded-lg flex items-center justify-center">
              {/* <svg 
                className="w-6 h-6 text-white" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.371-.721.49-1.101.241-3.021-1.85-6.82-2.27-11.3-1.24-.418.1-.851-.16-.95-.58-.1-.42.16-.851.58-.951 4.9-1.12 9.1-.63 12.5 1.38.38.23.489.721.241 1.1zm1.47-3.27c-.301.45-.921.6-1.381.29-3.45-2.12-8.7-2.73-12.791-1.49-.51.17-1.061-.11-1.23-.63-.17-.51.11-1.061.63-1.23 4.671-1.42 10.471-.72 14.461 1.68.45.3.6.93.29 1.38zm.129-3.42c-4.15-2.461-11.001-2.69-14.951-1.49-.61.2-1.25-.12-1.451-.73-.2-.61.12-1.25.73-1.45 4.561-1.38 12.131-1.12 16.891 1.72.57.34.761 1.08.42 1.66-.34.57-1.08.76-1.66.42z"/>
              </svg> */}
            </div>
          </div>
          <h2 className="mt-6 text-center text-2xl font-semibold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Connect with Spotify to continue
          </p>
        </div>

        {/* Sign-in card */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <SpotifyButton />
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Protected by Supabase Auth
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500">
            By signing in, you agree to our{' '}
            <a href="#" className="font-medium text-gray-900 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-gray-900 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}