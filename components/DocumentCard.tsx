import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import CategoryBadge from './CategoryBadge';
import { FileText, Calendar, ArrowRight } from 'lucide-react';
import DeleteButton from './DeleteButton';

export default function DocumentCard({ doc }: { doc: any }) {
    return (
        <div className="group relative rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md flex flex-col h-full">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                        <FileText className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold leading-none tracking-tight line-clamp-1">{doc.file_name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {new Date(doc.created_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <CategoryBadge category={doc.category} />
            </div>

            <div className="mt-4 flex-grow">
                <p className="line-clamp-2 text-sm text-muted-foreground">
                    {doc.summary}
                </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t pt-4">
                <Link
                    href={`/document/${doc.id}`}
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                    View Details
                    <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
                <div className="scale-75 origin-right">
                    <DeleteButton id={doc.id} storagePath={doc.storage_path} />
                </div>
            </div>
        </div>
    );
}
