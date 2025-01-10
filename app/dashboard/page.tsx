'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import SignOutButton from '@/components/auth/SignOutButton';

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/');
      } else {
        setSession(session);
      }
    };

    fetchSession();
  }, [router]);

  if (!session) {
    // Optional: Add a loading state here while fetching the session
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Signed in as: {session.user.email}
          </p>
        </div>

        <div className="flex justify-center">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
