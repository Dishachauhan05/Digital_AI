import { createClient } from '@/lib/supabaseServer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const fileName = `${Date.now()}-${file.name}`;
        const storagePath = `${user.id}/${fileName}`;

        const { data, error } = await supabase.storage
            .from('document')
            .upload(storagePath, file);

        if (error) throw error;

        return NextResponse.json({
            storage_path: storagePath,
            file_name: file.name
        });

    } catch (error: any) {
        console.error('Upload error:', error);
        return new Response(JSON.stringify({
            error: error.message || 'An unexpected error occurred',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
