import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()

    // Log state before code exchange
    console.log('Client state before exchange:', {
      auth: await supabase.auth.getSession(),
      headers: supabase.rest.headers
    })

    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code)

    // Log state after code exchange
    console.log('Client state after exchange:', {
      auth: await supabase.auth.getSession(),
      headers: supabase.rest.headers
    })


    // if (true) {
    //     try {
    //       // Store the tokens
    //       const { error: storageError } = await supabase
    //         .from('spotify_tokens')
    //         .upsert({
    //           user_id: "345",
    //           access_token: "access_123",
    //           refresh_token: "refresh_123",
    //           expires_at: new Date(Date.now() + 3600 * 1000).toISOString() // 1 hour from now
    //         })
            
    //       if (storageError) throw storageError
    //     } catch (error) {
    //       console.error('Token storage error:', error)
    //       // Continue anyway as the auth was successful
    //     }


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

    return NextResponse.redirect(new URL(next, request.url))
  }

  return NextResponse.redirect(new URL('/auth/error', request.url))
}