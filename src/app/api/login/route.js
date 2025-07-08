import { NextResponse } from 'next/server';
import admin from "firebase-admin"
import { getFirestore } from 'firebase-admin/firestore';


if (!admin.apps.length) {
    const serviceAccount = require("../../../config/servicefile.json")
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),

    });
}

export async function GET(request) {
  // Get code from searchParams instead of request body

  // const { searchParams } = new URL(request.url);
  // const code = searchParams.get('code');

  const url = new URL(request.url, `https://${request.headers.get('host')}`);
  const code = url.searchParams.get('code');
  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
      }),

      //ok
      
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Token error:', tokens);
      return NextResponse.redirect(
        new URL(`/home?toast=Failed to login with Discord:&type=error`, request.url)
      );
    }

    // Get user data from Discord
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });
 

    const userData = await userResponse.json();
    console.log("userData=====>", userData)

    if (!userResponse.ok) {
      console.error('User data error:', userData);
      return NextResponse.redirect(
        new URL(`/home?toast=Failed to login with Discord&type=error`, request.url)
      );
    }

    // Format user data with additional fields
    const formattedUserData = {
      uid: userData.id,
      email: userData.email,
      displayName: userData.username,
      status:"Open",
      photoURL: userData.avatar 
        ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
        : null,
      discordId: userData.id,
      lastLogin: new Date().toISOString(),
      provider: 'discord',
    };

    console.log("formattedUserData=====>", formattedUserData)
    

    // Add or update user in Firebase with error handling
    try {
      const db = getFirestore();
      const userRef = db.collection('users').doc(formattedUserData.uid);
      
      // Check if user exists
      const userDoc = await userRef.get();
      
      if (!userDoc.exists) {
        // Only create new user if they don't exist
        await userRef.set(formattedUserData);
      } else {
        // Just update the lastLogin field if user exists
        await userRef.update({
          lastLogin: formattedUserData.lastLogin
        });
      }
    } catch (dbError) {
      console.error('Firebase error:', dbError);
      return NextResponse.redirect(
        new URL(`/home?toast=Failed to login with Discord&type=error`, request.url)
      );
    }
      
    // Redirect with success message
    return NextResponse.redirect(
      new URL(`/home?toast=Successfully logged in with Discord!&type=success&userId=${formattedUserData.uid}`, request.url)
    );
  } catch (error) {
    console.error('Discord login error:', error);
    return NextResponse.redirect(
      new URL(`/home?toast=Authentication failed&type=error`, request.url)
    );
  }
}