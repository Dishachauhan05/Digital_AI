import { extractText as parsePdf } from "unpdf";

export async function extractText(fileBuffer) {
  try {
    const uint8Array = new Uint8Array(fileBuffer);
    
    // unpdf returns { text: string[] } or { text: string } 
    // depending on version/config, so we handle both
    const result = await parsePdf(uint8Array);
    
    let fullText = "";
    
    if (Array.isArray(result.text)) {
      fullText = result.text.join("\n");
    } else {
      fullText = result.text || "";
    }
    
    if (!fullText.trim()) {
      return "No text could be extracted from this document.";
    }

    return fullText;
  } catch (error) {
    console.error("Extraction Error:", error);
    throw new Error(`PDF Parsing failed: ${error.message}`);
  }
}