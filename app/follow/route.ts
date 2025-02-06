import { createClient } from '@/lib/supabase/server'
// import React, { useState, useEffect } from "react";
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const inviterId = requestUrl.searchParams.get('inviterId')

  console.log("Initiating new follower relationship for", inviterId)

  // Check if user is already logged in.
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  console.log("Here is the session user (if there)", session?.user?.id)

  // If inviterId exists but no logged in user, send them to the home page to log in.
  if (inviterId && !session?.user?.id) {

    const redirectUrl = new URL('/', request.url)
    redirectUrl.searchParams.set('inviterId', inviterId);
    redirectUrl.searchParams.set('follow_status', 'initiated');
    console.log("Redirecting using to the home page to log in", redirectUrl.toString())

    return NextResponse.redirect(redirectUrl)
  }

  // If inviterId exists and the user is logged in, initiate a follower relationship.
  let follow_status = 'failed';
  const apiBaseUrl = process.env.BACKEND_BASE_URL;
  if (session?.user?.id && inviterId) {
    console.log("Sending post request to create new follower relationship.")
    try {
      await fetch(`${apiBaseUrl}/create-follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user1: inviterId,
          user2: session.user.id
        })
      });
      follow_status = "success";
    } catch (error) {
      console.error('Error creating follower relationship:', error);
    }
  }

  const redirectUrl = new URL('/', request.url);
  redirectUrl.searchParams.set('follow_status', String(follow_status));
  redirectUrl.searchParams.set('inviterId', inviterId || '');

  return NextResponse.redirect(redirectUrl)

}