import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeFile(text) {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-3-flash-preview", 
    generationConfig: { responseMimeType: "application/json" }
  });

  if (!text || text.trim().length < 10) {
    return { category: "Other", summary: "File content unreadable or empty." };
  }

  const prompt = `
    Analyze this document and classify it into EXACTLY ONE category.
    RETURN ONLY JSON: { "category": "String", "summary": "String" }

    ALLOWED CATEGORIES:
    - Career (Resumes/CVs) [cite: 35, 56]
    - Finance (Invoices/Bills) [cite: 36, 62]
    - Study (Notes/Lectures) [cite: 37, 63]
    - Photos (Images/Gallery) [cite: 38, 64]
    - Work (Professional reports) [cite: 39]
    - Other (Anything else)

    CONTENT: ${text.substring(0, 12000)}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const data = JSON.parse(response.text());
    
    // Strict validation to prevent "Other" defaults if AI hallucinates
    const valid = ["Career", "Finance", "Study", "Photos", "Work", "Other"];
    return valid.includes(data.category) ? data : { ...data, category: "Other" };
  } catch (error) {
    console.error("AI Error:", error);
    return { category: "Other", summary: "AI Analysis failed." };
  }
}