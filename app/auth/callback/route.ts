import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/'
  const inviterId = requestUrl.searchParams.get('inviterId')

  if (code) {
    const supabase = await createClient()

    // Log state before code exchange
    console.log('Client state before exchange:', {
      auth: await supabase.auth.getSession(),
    })

    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      console.error('Auth callback error:', error)
      // Handle error appropriately
    } 
  
    // Log state after code exchange
    console.log('Client state after exchange:', {
      auth: await supabase.auth.getSession(),
    })

    if (error) {
      console.error('Auth error:', error)
      return NextResponse.redirect(new URL('/auth/error', request.url))
    }

    if (session?.provider_token) {
      try {
        // Store the tokens
        const { error: storageError } = await supabase
          .from('spotify_tokens')
          .upsert({
            user_id: session.user.id,
            email: session.user.email,
            access_token: session.provider_token,
            refresh_token: session.provider_refresh_token,
            expires_at: new Date(Date.now() + 3600 * 1000).toISOString() // 1 hour from now
          })
          
        if (storageError) throw storageError
      } catch (error) {
        console.error('Token storage error:', error)
        // Continue anyway as the auth was successful
      }
    }

    
 
    // If inviterId exist present, will send them to the follow endpoint
    if (inviterId) {
      console.log("Now routing the auth callback to the 'follow' endpoint.")
      const targetUrl = new URL('/follow', request.url)
      targetUrl.searchParams.set('inviterId', inviterId)
      return NextResponse.redirect(targetUrl)
    } 

    // Otherwise, they'll be sent back home.
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.redirect(new URL('/auth/error', request.url))
}