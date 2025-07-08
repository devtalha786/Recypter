// src/app/api/template-inputs/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    // Get templateName from URL search params
    const { searchParams } = new URL(request.url);
    const templateName = searchParams.get('templateName');
    console.log("templateName",templateName)

    if (!templateName) {
      return NextResponse.json(
        { error: 'Template name is required' },
        { status: 400 }
      );
    }

    const templatesJsonPath = path.join(process.cwd(), 'json', 'templates.json');
    const templateAttrsPath = path.join(process.cwd(), 'json', 'template-attrs.json');
    const templatesJson = JSON.parse(fs.readFileSync(templatesJsonPath, 'utf-8'));
    const templateAttrsJson = JSON.parse(fs.readFileSync(templateAttrsPath, 'utf-8'));

    const templateObj = templatesJson[templateName];
    
    if (!templateObj) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    const objInput = {};

    Object.keys(templateObj).forEach((v) => {
      if (templateAttrsJson[v]) {
        objInput[v] = templateAttrsJson[v];
      }
    });
    console.log("objInput",objInput)

    return NextResponse.json(objInput, { status: 200 });

  } catch (error) {
    console.error('Error getting template inputs:', error);
    return NextResponse.json(
      { error: 'Failed to get template inputs' },
      { status: 500 }
    );
  }
}