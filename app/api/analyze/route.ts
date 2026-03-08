import { createClient } from '@/lib/supabaseServer';
import { NextResponse } from 'next/server';
import { extractText } from '@/lib/extractText';
import { analyzeDocument } from '@/lib/gemini';

export async function POST(req: Request) {
    try {
        const { storage_path, file_name } = await req.json();

        if (!storage_path || !file_name) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }


        const { data: fileData, error: downloadError } = await supabase.storage
            .from('document')
            .download(storage_path);

        if (downloadError) throw downloadError;


        const buffer = Buffer.from(await fileData.arrayBuffer());
        const text = await extractText(buffer, file_name);


        const analysis = await analyzeDocument(text);


        const { data: doc, error: dbError } = await supabase
            .from('documents')
            .insert({
                user_id: user.id,
                file_name,
                storage_path,
                category: analysis.category,
                summary: analysis.summary
            })
            .select()
            .single();

        if (dbError) throw dbError;

        return NextResponse.json(doc);

    } catch (error: any) {
        console.error('Analysis error:', error);
        return new Response(JSON.stringify({
            error: error.message || 'An unexpected error occurred',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
