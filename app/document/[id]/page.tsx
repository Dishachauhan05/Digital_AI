import { createClient } from '@/lib/supabaseServer';
import { redirect, notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import CategoryBadge from '@/components/CategoryBadge';
import { ArrowLeft, Calendar, FileText, Trash2, Download, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import DeleteButton from '@/components/DeleteButton';

export default async function DocumentDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    const { data: doc } = await supabase
        .from('documents')
        .select('*')
        .eq('id', params.id)
        .eq('user_id', user.id)
        .single();

    if (!doc) notFound();


    const { data: { publicUrl } } = supabase.storage
        .from('document')
        .getPublicUrl(doc.storage_path);

    return (
        <div className="min-h-screen bg-muted/30">
            <Navbar user={user} />

            <main className="container mx-auto py-8 px-4 max-w-5xl">
                <Link
                    href="/dashboard"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
                >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Back to Dashboard
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-card border rounded-xl p-8 shadow-sm">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b pb-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                            <FileText className="h-6 w-6" />
                                        </div>
                                        <h1 className="text-2xl font-bold tracking-tight">{doc.file_name}</h1>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            {new Date(doc.created_at).toLocaleDateString()}
                                        </span>
                                        <CategoryBadge category={doc.category} />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <a
                                        href={publicUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent gap-2"
                                    >
                                        <Download className="h-4 w-4" />
                                        Download
                                    </a>
                                    <DeleteButton id={doc.id} storagePath={doc.storage_path} />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3">AI Summary</h3>
                                <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                                    {doc.summary}
                                </div>
                            </div>
                        </div>


                        <div className="bg-card border rounded-xl p-8 shadow-sm">
                            <h3 className="text-lg font-semibold mb-4">Metadata</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-1">
                                    <p className="text-muted-foreground">Storage Path</p>
                                    <p className="font-mono text-xs">{doc.storage_path}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-muted-foreground">Document ID</p>
                                    <p className="font-mono text-xs">{doc.id}</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="space-y-6">
                        <div className="bg-card border rounded-xl p-6 shadow-sm aspect-[3/4] flex flex-col items-center justify-center text-center">
                            <FileText className="h-20 w-20 text-muted-foreground/20 mb-4" />
                            <p className="text-sm text-muted-foreground mb-4">
                                Preview is currently unavailable for this file type.
                            </p>
                            <a
                                href={publicUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1"
                            >
                                Open Original File
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
