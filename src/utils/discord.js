export const getDiscordAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
    redirect_uri: `${process.env.NEXT_PUBLIC_DOMAIN}/auth/discord/callback`,
    response_type: 'code',
    scope: 'identify email', // Add more scopes if needed
  });

  return `https://discord.com/api/oauth2/authorize?${params.toString()}`;
}; 