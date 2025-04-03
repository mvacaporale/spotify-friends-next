// components/SignOutButton.tsx
'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'

// Exportable sign out function
export const handleSignOut = async (router: AppRouterInstance) => {
  const supabase = createClient()
  await supabase.auth.signOut()
  router.refresh()
  router.push('/')
}

export default function SignOutButton() {
  const router = useRouter()

  const onSignOut = async () => {
    await handleSignOut(router)
  }

  return (
    <button
      onClick={onSignOut}
      className="rounded-full bg-gray-800 px-6 py-2 font-semibold text-white hover:bg-gray-700"
    >
      Sign Out
    </button>
  )
}