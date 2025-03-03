import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
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
      // Store the user's access and refresh tokens.
      try {
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
        // Continue anyway as the auth was successful
        console.error('Token storage error:', error)
      }


      // Instantiate the user's playlists.
      const apiBaseUrl = process.env.BACKEND_BASE_URL;
      console.log("Sending post request to instantiate new user.", apiBaseUrl)
      try {
        await fetch(`${apiBaseUrl}/webhook/user-created`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: session.user.id,
          })
        });
      } catch (error) {
        console.error("Error creating new user playlists:", error);
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