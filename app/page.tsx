'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import SpotifyButton from '@/components/auth/spotify-button';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      }
    };

    checkSession();
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen flex-col py-12 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="w-10 h-10 bg-[#1DB954] rounded-lg flex items-center justify-center">
              {/* Add logo here */}
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
  );
}
