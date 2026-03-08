
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);


export const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
        responseMimeType: "application/json",
    }
});

export interface AnalysisResult {
    category: string;
    summary: string;
}

export async function analyzeDocument(text: string): Promise<AnalysisResult> {

    const prompt = `
You are an AI document classifier.
Analyze the following document.
Return a JSON response using this schema:
{
  "category": "document category",
  "summary": "short summary in 3-5 sentences"
}

Possible categories include:
Invoice, Resume, Legal, Academic, Medical, Financial, Personal, Other

Document content:
${text}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text();


    try {
        return JSON.parse(textResponse);
    } catch (error) {
        console.error("Raw response:", textResponse);
        throw new Error("Failed to parse Gemini response as JSON");
    }
}