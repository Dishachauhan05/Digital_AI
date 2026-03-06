import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DOCUMENTS_DIR = path.join(process.cwd(), "documents");

export async function GET() {
  try {
    // Ensure the documents directory exists
    await fs.mkdir(DOCUMENTS_DIR, { recursive: true });

    const entries = await fs.readdir(DOCUMENTS_DIR, { withFileTypes: true });
    
    const folders = [];
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const folderPath = path.join(DOCUMENTS_DIR, entry.name);
        const folderEntries = await fs.readdir(folderPath, { withFileTypes: true });
        
        const files = folderEntries
          .filter(e => e.isFile())
          .map(e => ({
            name: e.name,
            path: `${entry.name}/${e.name}`, // Path relative to documents/
          }));
          
        folders.push({
          name: entry.name,
          files: files,
        });
      }
    }

    return NextResponse.json(folders);
  } catch (error) {
    console.error("Error reading documents directory:", error);
    return NextResponse.json({ error: "Failed to read documents directory" }, { status: 500 });
  }
}
