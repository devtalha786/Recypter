import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read the HTML file
    
    const filePath = path.join(process.cwd(), 'public', 'ApplePaper.html');
    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    // Return the HTML content with appropriate headers
    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error reading HTML file:', error);
    return new NextResponse('Error loading receipt template', { status: 500 });
  }
}