import pdf from 'pdf-parse';
import mammoth from 'mammoth';

export async function extractText(file: Buffer, fileName: string): Promise<string> {
    const extension = fileName.split('.').pop()?.toLowerCase();

    switch (extension) {
        case 'pdf':
            const pdfData = await pdf(file);
            return pdfData.text;

        case 'docx':
            const docxData = await mammoth.extractRawText({ buffer: file });
            return docxData.value;

        case 'txt':
        case 'md':
            return file.toString('utf-8');

        default:
            throw new Error(`Unsupported file type: .${extension}`);
    }
}
