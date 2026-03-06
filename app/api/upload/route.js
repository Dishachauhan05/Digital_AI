import fs from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import crypto from "crypto";
import { extractText } from "@/lib/extractText";
import { analyzeFile } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileHash = crypto.createHash('md5').update(buffer).digest('hex');

    const text = await extractText(buffer);
    const aiResult = await analyzeFile(text); 
    const category = aiResult.category;

    const categoryDir = path.join(process.cwd(), "documents", category);
    if (!existsSync(categoryDir)) mkdirSync(categoryDir, { recursive: true });

    let fileName = file.name;
    let finalPath = path.join(categoryDir, fileName);
    let isDuplicate = false;

    if (existsSync(finalPath)) {
      isDuplicate = true;
      const ext = path.extname(fileName);
      fileName = `${path.basename(fileName, ext)}_copy${ext}`;
      finalPath = path.join(categoryDir, fileName);
    }

    await fs.writeFile(finalPath, new Uint8Array(buffer));

    return NextResponse.json({
      category,
      summary: aiResult.summary,
      fileHash,
      finalPath: `/documents/${category}/${fileName}`,
      isDuplicate,
      extractedPreview: text.substring(0, 300)
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}