// app/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SignOutButton from '@/components/auth/SignOutButton'

export default async function Dashboard() {
  const supabase = createClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/')
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
  )
}