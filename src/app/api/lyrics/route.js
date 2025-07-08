import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch lyrics');
    const text = await response.text();
    
    return NextResponse.json({ lyrics: text });
  } catch (error) {
    console.error('Lyrics fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch lyrics' }, { status: 500 });
  }
}