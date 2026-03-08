import { createClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';

export const revalidate = 0;
export const dynamic = 'force-dynamic';
import Navbar from '@/components/Navbar';
import DocumentCard from '@/components/DocumentCard';
import DashboardFilters from '@/components/DashboardFilters';
import { Plus, FileText } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage({
    searchParams,
}: {
    searchParams: { q?: string; category?: string };
}) {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    let query = supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (searchParams.q) {
        query = query.ilike('file_name', `%${searchParams.q}%`);
    }

    if (searchParams.category && searchParams.category !== 'All') {
        query = query.eq('category', searchParams.category);
    }

    const { data: documents } = await query;

    const categories = ['All', 'Invoice', 'Resume', 'Legal', 'Academic', 'Medical', 'Financial', 'Personal', 'Other'];

    return (
        <div className="min-h-screen bg-muted/30">
            <Navbar user={user} />

            <main className="container mx-auto py-8 px-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground">Manage and analyze your documents.</p>
                    </div>
                    <Link
                        href="/upload"
                        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Upload New
                    </Link>
                </div>

                <DashboardFilters
                    initialSearch={searchParams.q}
                    initialCategory={searchParams.category}
                    categories={categories}
                />


                {!documents || documents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-card border rounded-xl shadow-sm text-center">
                        <div className="p-4 bg-muted rounded-full mb-4">
                            <FileText className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold">No documents found</h3>
                        <p className="text-muted-foreground mb-6">
                            {searchParams.q || searchParams.category
                                ? "Try adjusting your filters or search query."
                                : "Get started by uploading your first document."}
                        </p>
                        {!searchParams.q && !searchParams.category && (
                            <Link
                                href="/upload"
                                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                            >
                                Upload Document
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {documents.map((doc: any) => (
                            <DocumentCard key={doc.id} doc={doc} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
