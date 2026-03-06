import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const history = await prisma.file.findMany({
      include: {
        analysis: true, // AI analysis details (category, summary) lane ke liye
      },
      orderBy: {
        uploadDate: 'desc', // Sabse nayi files sabse upar dikhengi
      },
    });

    const formattedHistory = history.map((file) => ({
      id: file.id,
      fileName: file.fileName,
      category: file.analysis?.category || "Other",
      summary: file.analysis?.summary || "No summary",
      isDuplicate: !!file.analysis?.duplicateGroup, 
      uploadDate: file.uploadDate,
    }));

    return NextResponse.json(formattedHistory);
  } catch (error) {
    console.error("History Fetch Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}