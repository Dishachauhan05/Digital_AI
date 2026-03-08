import { createClient } from '@/lib/supabaseServer';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function DELETE(req: Request) {
    try {
        const { id, storage_path } = await req.json();

        if (!id || !storage_path) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }


        const { error: storageError } = await supabase.storage
            .from('document')
            .remove([storage_path]);

        if (storageError) throw storageError;


        const { error: dbError } = await supabase
            .from('documents')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id);

        if (dbError) throw dbError;


        revalidatePath('/dashboard');

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}