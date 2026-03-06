import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get('path');
  
  if (!filePath) {
    return NextResponse.json({ error: "Path is required" }, { status: 400 });
  }

  try {
    const fullPath = path.join(process.cwd(), "documents", filePath);
    
    // Security check: ensure path is within documents directory to prevent path traversal
    const normalizedPath = path.normalize(fullPath);
    if (!normalizedPath.startsWith(path.join(process.cwd(), "documents"))) {
       return NextResponse.json({ error: "Invalid path" }, { status: 403 });
    }

    const fileBuffer = await fs.readFile(normalizedPath);
    
    // Determine a simple mime type
    const ext = path.extname(normalizedPath).toLowerCase();
    let mimeType = 'application/octet-stream';
    if (ext === '.pdf') mimeType = 'application/pdf';
    else if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
    else if (ext === '.png') mimeType = 'image/png';
    else if (ext === '.txt') mimeType = 'text/plain';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': mimeType,
      },
    });
  } catch (error) {
    console.error("Error serving file:", error);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
